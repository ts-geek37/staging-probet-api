import logger from "@/logger";
import { broadcastLiveMatches } from "./live.broadcaster";
import { setLiveCache } from "./live.cache";
import { LIVE_POLL_INTERVAL_MS } from "./live.constants";
import { fetchLiveMatches } from "./live.fetcher";

export const startLiveMatchPolling = () => {
  logger.info("live.poller.started");

  setInterval(async () => {
    try {
      const matches = await fetchLiveMatches();
      setLiveCache(matches);
      broadcastLiveMatches(matches);
    } catch (err) {
      logger.error("live.poller.error", { err });
    }
  }, LIVE_POLL_INTERVAL_MS);
};
