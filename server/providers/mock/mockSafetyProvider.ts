import type { SafetyProvider, SafetySearchParams } from "../interfaces.js";

const riskScores: Record<string, number> = {
  Lisbon: 18,
  Reykjavik: 9,
  "Mexico City": 52,
  Vancouver: 14,
  "San Juan": 28,
  Bogota: 46,
  Copenhagen: 12
};

export const mockSafetyProvider: SafetyProvider = {
  async getRiskScore(params: SafetySearchParams) {
    const riskIndex = riskScores[params.destination] ?? 30;
    return {
      location: params.destination,
      risk_index: riskIndex,
      scale: "0-100"
    };
  }
};
