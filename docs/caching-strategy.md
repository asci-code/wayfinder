# Caching Strategy

## Cache Key
```
origin + date_range + budget + preferences
```
Preferences are canonicalized into a sorted string so the same intent maps to the same cache key.

## Stale-While-Revalidate
Wayfinder returns cached responses immediately when available. If the cached payload is near expiry, the system:

1. Returns the cached payload with a `cache.status = "stale"` marker.
2. Enqueues a Redis job to recompute the recommendations.

This keeps latency low while still refreshing expensive provider data in the background.

## Redis Job Queue
The job queue is a lightweight list-based implementation built on Redis primitives. Jobs are pushed with `LPUSH` and workers pop with `RPOP` to process refreshes.
