import { getLiveCache } from "./live.cache";

export const getLiveMatchesController = async () => {
  const cache = getLiveCache();

  return {
    meta: {
      last_updated: cache.updatedAt
        ? new Date(cache.updatedAt).toISOString()
        : null,
      refresh_in_seconds: 30,
    },
    data: cache.data,
  };
};
