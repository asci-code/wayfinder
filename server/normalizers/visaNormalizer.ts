import { clamp } from "./utils.js";

export type NormalizedVisa = {
  visaFrictionScore: number;
  explanation: string;
};

const visaMapping: Record<string, number> = {
  "visa-free": 1,
  "passport-only": 0.9,
  eta: 0.75,
  "e-visa": 0.65,
  consular: 0.3
};

export const normalizeVisa = (raw: unknown): NormalizedVisa => {
  const payload = raw as { entry?: { requirement?: string } };
  const requirement = payload.entry?.requirement ?? "consular";
  const visaFrictionScore = clamp(visaMapping[requirement] ?? 0.4);
  const explanation = `Visa requirement: ${requirement}.`;

  return { visaFrictionScore, explanation };
};
