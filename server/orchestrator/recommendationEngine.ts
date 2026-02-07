import { candidateDestinations } from "../data/destinations.js";
import { mockFlightProvider } from "../providers/mock/mockFlightProvider.js";
import { mockWeatherProvider } from "../providers/mock/mockWeatherProvider.js";
import { mockSafetyProvider } from "../providers/mock/mockSafetyProvider.js";
import { mockVisaProvider } from "../providers/mock/mockVisaProvider.js";
import { mockSeasonalityProvider } from "../providers/mock/mockSeasonalityProvider.js";
import {
  normalizeFlight,
  normalizeSafety,
  normalizeSeasonality,
  normalizeVisa,
  normalizeWeather
} from "../normalizers/index.js";
import type { RecommendationRequest, RecommendationResponse } from "../types/index.js";
import { defaultWeights, scoreDestination } from "../scoring/scoreDestination.js";
import {
  buildCacheKey,
  getCachedRecommendations,
  isStale,
  setCachedRecommendations
} from "../cache/recommendationsCache.js";
import { enqueueJob } from "../jobs/queue.js";

const mergeWeights = (
  weights: RecommendationRequest["weights"]
): typeof defaultWeights => ({
  ...defaultWeights,
  ...weights
});

export const buildProfiles = async (request: RecommendationRequest) => {
  const profiles = await Promise.all(
    candidateDestinations.map(async (destination) => {
      const [flight, weather, safety, visa, seasonality] = await Promise.all([
        mockFlightProvider.searchFlights({
          origin: request.origin,
          destination,
          dateRange: request.dateRange,
          maxBudget: request.budget
        }),
        mockWeatherProvider.getForecast({
          destination,
          dateRange: request.dateRange
        }),
        mockSafetyProvider.getRiskScore({ destination }),
        mockVisaProvider.getVisaRequirements({
          origin: request.origin,
          destination
        }),
        mockSeasonalityProvider.getSeasonality({
          destination,
          dateRange: request.dateRange
        })
      ]);

      const flightNormalized = normalizeFlight(flight, request.budget);
      const weatherNormalized = normalizeWeather(weather);
      const safetyNormalized = normalizeSafety(safety);
      const visaNormalized = normalizeVisa(visa);
      const seasonalityNormalized = normalizeSeasonality(seasonality);

      return {
        destination,
        totalTripCost: flightNormalized.totalTripCost,
        travelTimeHours: flightNormalized.travelTimeHours,
        weatherScore: weatherNormalized.weatherScore,
        safetyScore: safetyNormalized.safetyScore,
        visaFrictionScore: visaNormalized.visaFrictionScore,
        seasonalityScore: seasonalityNormalized.seasonalityScore,
        overallScore: 0,
        normalizedCostScore: flightNormalized.normalizedCostScore,
        explanation: {
          flight: flightNormalized.explanation,
          weather: weatherNormalized.explanation,
          safety: safetyNormalized.explanation,
          visa: visaNormalized.explanation,
          seasonality: seasonalityNormalized.explanation
        }
      };
    })
  );

  return profiles;
};

export const generateRecommendations = async (
  request: RecommendationRequest
): Promise<RecommendationResponse> => {
  const weights = mergeWeights(request.weights);
  const profiles = await buildProfiles(request);
  const scored = profiles
    .map((profile) => scoreDestination(profile, weights))
    .sort((a, b) => b.overallScore - a.overallScore);

  return {
    requestId: crypto.randomUUID(),
    generatedAt: new Date().toISOString(),
    results: scored,
    weights,
    cache: { status: "miss" }
  };
};

export const getRecommendations = async (
  request: RecommendationRequest
): Promise<RecommendationResponse> => {
  const cacheKey = buildCacheKey(
    request.origin,
    request.budget,
    request.dateRange,
    request.preferences
  );
  const cached = await getCachedRecommendations(cacheKey);
  if (cached?.payload) {
    const cacheStatus = isStale(cached.ttl) ? "stale" : "hit";
    if (cacheStatus === "stale") {
      await enqueueJob({ type: "refresh-recommendations", cacheKey });
    }

    return {
      ...cached.payload,
      cache: { status: cacheStatus }
    };
  }

  const response = await generateRecommendations(request);
  await setCachedRecommendations(cacheKey, response);
  return response;
};

export const refreshRecommendations = async (cacheKey: string) => {
  const parsed = cacheKey.split(":");
  if (parsed.length < 5) {
    return;
  }
  const [, origin, budget, start, end] = parsed;
  const request: RecommendationRequest = {
    origin,
    budget: Number(budget),
    dateRange: { start, end }
  };
  const response = await generateRecommendations(request);
  await setCachedRecommendations(cacheKey, response);
};
