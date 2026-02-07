import { dequeueJob } from "./queue.js";
import { refreshRecommendations } from "../orchestrator/recommendationEngine.js";

export const runWorker = async () => {
  const job = await dequeueJob();
  if (!job) {
    return;
  }

  if (job.type === "refresh-recommendations") {
    await refreshRecommendations(job.cacheKey);
  }
};
