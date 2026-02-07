import { getRedisClient } from "./redisClient.js";
import type { RecommendationResponse } from "../types/index.js";

const CACHE_TTL_SECONDS = 60 * 30;
const STALE_TTL_SECONDS = 60 * 5;

export const buildCacheKey = (
  origin: string,
  budget: number,
  dateRange: { start: string; end: string },
  preferences?: Record<string, boolean | undefined>
) => {
  const prefs = preferences
    ? Object.entries(preferences)
        .filter(([, value]) => value)
        .map(([key]) => key)
        .sort()
        .join(",")
    : "";
  return `recommendations:${origin}:${budget}:${dateRange.start}:${dateRange.end}:${prefs}`;
};

export const getCachedRecommendations = async (key: string) => {
  const client = getRedisClient();
  try {
    await client.connect();
    const cached = await client.get(key);
    if (!cached) {
      return null;
    }
    const payload = JSON.parse(cached) as RecommendationResponse;
    const ttl = await client.ttl(key);
    return { payload, ttl };
  } catch (error) {
    console.warn("Cache read failed", error);
    return null;
  }
};

export const setCachedRecommendations = async (
  key: string,
  value: RecommendationResponse
) => {
  const client = getRedisClient();
  try {
    await client.connect();
    await client.set(key, JSON.stringify(value), "EX", CACHE_TTL_SECONDS);
  } catch (error) {
    console.warn("Cache write failed", error);
  }
};

export const isStale = (ttl: number | null) =>
  ttl !== null && ttl < STALE_TTL_SECONDS;
