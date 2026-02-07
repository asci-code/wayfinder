import type { DateRange } from "../types/index.js";

export type FlightSearchParams = {
  origin: string;
  destination: string;
  dateRange: DateRange;
  maxBudget: number;
};

export type WeatherSearchParams = {
  destination: string;
  dateRange: DateRange;
};

export type SafetySearchParams = {
  destination: string;
};

export type VisaSearchParams = {
  origin: string;
  destination: string;
};

export type SeasonalitySearchParams = {
  destination: string;
  dateRange: DateRange;
};

export interface FlightProvider {
  searchFlights(params: FlightSearchParams): Promise<unknown>;
}

export interface WeatherProvider {
  getForecast(params: WeatherSearchParams): Promise<unknown>;
}

export interface SafetyProvider {
  getRiskScore(params: SafetySearchParams): Promise<unknown>;
}

export interface VisaProvider {
  getVisaRequirements(params: VisaSearchParams): Promise<unknown>;
}

export interface SeasonalityProvider {
  getSeasonality(params: SeasonalitySearchParams): Promise<unknown>;
}
