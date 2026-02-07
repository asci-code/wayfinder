export type DateRange = {
  start: string;
  end: string;
};

export type Preferences = {
  warm?: boolean;
  safe?: boolean;
  cheap?: boolean;
  shortFlight?: boolean;
};

export type ScoringWeights = {
  priceWeight: number;
  weatherWeight: number;
  safetyWeight: number;
  visaWeight: number;
  seasonalityWeight: number;
};

export type RecommendationRequest = {
  origin: string;
  budget: number;
  dateRange: DateRange;
  preferences?: Preferences;
  weights?: Partial<ScoringWeights>;
};

export type DestinationProfile = {
  destination: string;
  totalTripCost: number;
  travelTimeHours: number;
  weatherScore: number;
  safetyScore: number;
  visaFrictionScore: number;
  seasonalityScore: number;
  overallScore: number;
  normalizedCostScore: number;
  explanation: Record<string, string>;
};

export type RecommendationResponse = {
  requestId: string;
  generatedAt: string;
  results: DestinationProfile[];
  weights: ScoringWeights;
  cache: {
    status: "hit" | "miss" | "stale";
  };
};
