# Scoring Model

## Normalization
All scoring inputs are normalized to a **0–1 scale**.

- **Cost score**: `1 - (totalTripCost / budget)` clamped to `[0, 1]`.
- **Weather score**: weighted blend of temperature comfort curve, rain penalty, and sunny hours.
- **Safety score**: `1 - (riskIndex / 100)`.
- **Visa friction score**: text requirement mapped to an ease score (visa-free = 1.0, consular = 0.3).
- **Seasonality score**: `1 - (crowdIndex / 100)`.

## Overall Score
```
overallScore =
  priceWeight * normalizedCostScore +
  weatherWeight * weatherScore +
  safetyWeight * safetyScore +
  visaWeight * visaFrictionScore +
  seasonalityWeight * seasonalityScore
```

Weights are provided per request (with defaults) so users can emphasize cost vs. weather vs. safety. The output includes explanations for each sub-score to keep the ranking interpretable.
