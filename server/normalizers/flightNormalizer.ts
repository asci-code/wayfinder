import { clamp } from "./utils.js";

export type NormalizedFlight = {
  totalTripCost: number;
  travelTimeHours: number;
  normalizedCostScore: number;
  explanation: string;
};

export const normalizeFlight = (raw: unknown, budget: number): NormalizedFlight => {
  const payload = raw as {
    routes?: Array<{ priceUSD?: number; durationHours?: number; layovers?: number }>;
  };
  const route = payload.routes?.[0];
  const totalTripCost = route?.priceUSD ?? budget * 1.2;
  const travelTimeHours = route?.durationHours ?? 8;
  const normalizedCostScore = clamp(1 - totalTripCost / budget);
  const explanation = `Flight cost $${totalTripCost.toFixed(0)} for ${travelTimeHours.toFixed(
    1
  )}h travel time.`;

  return {
    totalTripCost,
    travelTimeHours,
    normalizedCostScore,
    explanation
  };
};
