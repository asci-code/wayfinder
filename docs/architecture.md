# Wayfinder Architecture

## Overview
Wayfinder is a decision engine that aggregates heterogeneous travel data, normalizes the signals, and scores destinations deterministically. The architecture separates providers, normalization, scoring, caching, and orchestration to keep the decision logic transparent and testable.

## Runtime Flow
1. **API request** hits `/api/recommendations`.
2. **Orchestrator** selects candidate destinations and calls providers in parallel.
3. **Providers** return raw, inconsistent schemas (simulating real APIs).
4. **Normalizers** convert raw responses into the unified `DestinationProfile` fields.
5. **Scoring engine** computes `overallScore` using weighted scoring.
6. **Cache layer** returns cached results or triggers refresh via Redis jobs.

## Directory Layout
```
app/                   # Next.js App Router UI + API routes
server/
  orchestrator/        # Orchestration + aggregation logic
  providers/           # Provider interfaces + mock adapters
  normalizers/         # Data normalization utilities
  scoring/             # Deterministic scoring engine
  cache/               # Redis cache utilities
  jobs/                # Lightweight Redis-backed queue
  database/            # Prisma client
  data/                # Destination seed data
```

## Data Model
The `DestinationProfile` captures the unified decision surface. It preserves raw metrics (cost, travel time), normalized scores (0–1), and a textual explanation so each recommendation is explainable.
