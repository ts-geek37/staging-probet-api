import { LiveCache } from "./live.types";

const liveCache: LiveCache = {
  updatedAt: 0,
  data: [],
};

export const setLiveCache = (data: LiveCache["data"]) => {
  liveCache.updatedAt = Date.now();
  liveCache.data = data;
};

export const getLiveCache = (): LiveCache => {
  return liveCache;
};
