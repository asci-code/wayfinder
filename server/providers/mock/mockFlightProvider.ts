import type { FlightProvider, FlightSearchParams } from "../interfaces.js";

const baseFares: Record<string, number> = {
  Lisbon: 420,
  Reykjavik: 510,
  "Mexico City": 330,
  Vancouver: 390,
  "San Juan": 280,
  Bogota: 360,
  Copenhagen: 540
};

export const mockFlightProvider: FlightProvider = {
  async searchFlights(params: FlightSearchParams) {
    const base = baseFares[params.destination] ?? 450;
    const variance = (params.destination.length % 5) * 22;
    const priceUSD = base + variance;
    const durationHours = 3 + (params.destination.length % 7) * 1.4;
    return {
      meta: { source: "MockFlightNet", currency: "USD" },
      routes: [
        {
          to: params.destination,
          priceUSD,
          durationHours,
          layovers: Math.max(0, Math.floor(durationHours / 5) - 1)
        }
      ]
    };
  }
};
