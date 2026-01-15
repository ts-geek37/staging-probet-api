import { Server } from "socket.io";
import { LiveMatchItem } from "./live.types";

let io: Server | null = null;

export const initLiveBroadcaster = (server: Server) => {
  io = server;
};

export const broadcastLiveMatches = (matches: LiveMatchItem[]) => {
  if (!io) return;

  io.emit("LIVE_MATCHES_UPDATE", {
    updatedAt: Date.now(),
    data: matches,
  });
};
