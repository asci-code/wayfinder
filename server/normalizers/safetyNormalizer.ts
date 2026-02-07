import { clamp } from "./utils.js";

export type NormalizedSafety = {
  safetyScore: number;
  explanation: string;
};

export const normalizeSafety = (raw: unknown): NormalizedSafety => {
  const payload = raw as { risk_index?: number; scale?: string };
  const riskIndex = payload.risk_index ?? 50;
  const safetyScore = clamp(1 - riskIndex / 100);
  const explanation = `Safety risk index ${riskIndex}/100.`;

  return { safetyScore, explanation };
};
