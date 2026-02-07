import type { SeasonalityProvider, SeasonalitySearchParams } from "../interfaces.js";

const crowdIndex: Record<string, number> = {
  Lisbon: 62,
  Reykjavik: 48,
  "Mexico City": 55,
  Vancouver: 44,
  "San Juan": 70,
  Bogota: 38,
  Copenhagen: 58
};

export const mockSeasonalityProvider: SeasonalityProvider = {
  async getSeasonality(params: SeasonalitySearchParams) {
    const crowd_score = crowdIndex[params.destination] ?? 50;
    return {
      destination: params.destination,
      crowd_score,
      label: crowd_score > 60 ? "busy" : "comfortable"
    };
  }
};
