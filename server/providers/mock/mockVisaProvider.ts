import type { VisaProvider, VisaSearchParams } from "../interfaces.js";

const visaRules: Record<string, string> = {
  Lisbon: "visa-free",
  Reykjavik: "visa-free",
  "Mexico City": "e-visa",
  Vancouver: "eta",
  "San Juan": "passport-only",
  Bogota: "consular",
  Copenhagen: "visa-free"
};

export const mockVisaProvider: VisaProvider = {
  async getVisaRequirements(params: VisaSearchParams) {
    return {
      origin_country: params.origin,
      destination_country: params.destination,
      entry: {
        requirement: visaRules[params.destination] ?? "consular",
        notes: "Mock response"
      }
    };
  }
};
