import type { DestinationProfile, ScoringWeights } from "../types/index.js";
import { clamp } from "../normalizers/utils.js";

export const defaultWeights: ScoringWeights = {
  priceWeight: 0.3,
  weatherWeight: 0.25,
  safetyWeight: 0.2,
  visaWeight: 0.15,
  seasonalityWeight: 0.1
};

export const scoreDestination = (
  profile: DestinationProfile,
  weights: ScoringWeights
): DestinationProfile => {
  const overallScore = clamp(
    profile.normalizedCostScore * weights.priceWeight +
      profile.weatherScore * weights.weatherWeight +
      profile.safetyScore * weights.safetyWeight +
      profile.visaFrictionScore * weights.visaWeight +
      profile.seasonalityScore * weights.seasonalityWeight
  );

  return {
    ...profile,
    overallScore
  };
};
