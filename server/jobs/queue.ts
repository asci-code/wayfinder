import { getRedisClient } from "../cache/redisClient.js";

const QUEUE_KEY = "wayfinder:jobs";

export type JobPayload = {
  type: "refresh-recommendations";
  cacheKey: string;
};

export const enqueueJob = async (job: JobPayload) => {
  const client = getRedisClient();
  try {
    await client.connect();
    await client.lpush(QUEUE_KEY, JSON.stringify(job));
  } catch (error) {
    console.warn("Failed to enqueue job", error);
  }
};

export const dequeueJob = async (): Promise<JobPayload | null> => {
  const client = getRedisClient();
  try {
    await client.connect();
    const payload = await client.rpop(QUEUE_KEY);
    return payload ? (JSON.parse(payload) as JobPayload) : null;
  } catch (error) {
    console.warn("Failed to dequeue job", error);
    return null;
  }
};
