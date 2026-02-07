import { clamp } from "./utils.js";

export type NormalizedWeather = {
  weatherScore: number;
  explanation: string;
};

const comfortCurve = (tempC: number) => {
  const ideal = 22;
  const delta = Math.abs(tempC - ideal);
  return clamp(1 - delta / 15);
};

export const normalizeWeather = (raw: unknown): NormalizedWeather => {
  const payload = raw as {
    forecast_v2?: {
      temp_c?: number;
      rain_probability?: number;
      sunny_hours?: number;
    };
  };
  const temp = payload.forecast_v2?.temp_c ?? 20;
  const rain = payload.forecast_v2?.rain_probability ?? 0.2;
  const sunnyHours = payload.forecast_v2?.sunny_hours ?? 5;

  const tempScore = comfortCurve(temp);
  const rainScore = clamp(1 - rain);
  const sunScore = clamp(sunnyHours / 10);
  const weatherScore = clamp(tempScore * 0.5 + rainScore * 0.3 + sunScore * 0.2);
  const explanation = `Forecast ${temp}°C with ${(rain * 100).toFixed(
    0
  )}% rain chance and ${sunnyHours} sunny hours.`;

  return { weatherScore, explanation };
};
