# Wayfinder

Wayfinder is an intelligent travel recommendation engine that aggregates heterogeneous travel data, normalizes it into a unified decision model, and returns ranked recommendations with explainable scoring.

## Features
- Multi-provider aggregation (flights, weather, safety, visa, seasonality).
- Normalization into a single `DestinationProfile` with 0–1 scores.
- Deterministic scoring with configurable weights.
- Redis-backed cache with stale-while-revalidate.
- Lightweight Redis job queue for background refresh.

## Project Structure
```
app/                   # Next.js App Router UI + API routes
server/
  orchestrator/        # Aggregation + ranking
  providers/           # Provider interfaces + mock adapters
  normalizers/         # Normalization utilities
  scoring/             # Scoring engine
  cache/               # Redis cache utilities
  jobs/                # Background queue
  database/            # Prisma client
  data/                # Candidate destinations
prisma/                # Prisma schema
```

## API Usage
`POST /api/recommendations`

Example payload:
```json
{
  "origin": "NYC",
  "budget": 600,
  "dateRange": { "start": "2024-07-05", "end": "2024-07-07" },
  "preferences": { "warm": true, "safe": true },
  "weights": {
    "priceWeight": 0.35,
    "weatherWeight": 0.25,
    "safetyWeight": 0.2,
    "visaWeight": 0.1,
    "seasonalityWeight": 0.1
  }
}
```

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment:
   ```bash
   cp .env.example .env
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Environment Variables
See `.env.example` for required values.

- `DATABASE_URL` - PostgreSQL connection string.
- `REDIS_URL` - Redis connection string.

## Deploy to Vercel
1. Push the repository to GitHub.
2. In Vercel, import the repository.
3. Configure environment variables in Vercel:
   - `DATABASE_URL`
   - `REDIS_URL`
4. Deploy. Vercel will run `npm run build` by default.

> Tip: For production, use managed PostgreSQL and Redis providers (e.g. Neon, Supabase, Upstash).
