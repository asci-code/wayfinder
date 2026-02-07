import { clamp } from "./utils.js";

export type NormalizedSeasonality = {
  seasonalityScore: number;
  explanation: string;
};

export const normalizeSeasonality = (raw: unknown): NormalizedSeasonality => {
  const payload = raw as { crowd_score?: number; label?: string };
  const crowdScore = payload.crowd_score ?? 50;
  const seasonalityScore = clamp(1 - crowdScore / 100);
  const explanation = `Crowd index ${crowdScore}/100 (${payload.label ?? "unknown"}).`;

  return { seasonalityScore, explanation };
};
