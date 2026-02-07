import type { WeatherProvider, WeatherSearchParams } from "../interfaces.js";

const baseTemps: Record<string, number> = {
  Lisbon: 22,
  Reykjavik: 8,
  "Mexico City": 19,
  Vancouver: 15,
  "San Juan": 27,
  Bogota: 18,
  Copenhagen: 12
};

export const mockWeatherProvider: WeatherProvider = {
  async getForecast(params: WeatherSearchParams) {
    const base = baseTemps[params.destination] ?? 20;
    const rainProbability = (params.destination.length % 4) * 0.15 + 0.1;
    return {
      forecast_v2: {
        city: params.destination,
        temp_c: base + (params.destination.length % 3),
        rain_probability: Number(rainProbability.toFixed(2)),
        sunny_hours: 4 + (params.destination.length % 4)
      }
    };
  }
};
