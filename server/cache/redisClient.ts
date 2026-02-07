import Redis from "ioredis";

let client: Redis | null = null;

export const getRedisClient = () => {
  if (client) {
    return client;
  }

  const url = process.env.REDIS_URL || "redis://localhost:6379";
  client = new Redis(url, {
    maxRetriesPerRequest: 1,
    lazyConnect: true
  });

  client.on("error", (error) => {
    console.warn("Redis error", error.message);
  });

  return client;
};
