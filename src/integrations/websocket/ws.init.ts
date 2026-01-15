import { Server } from "socket.io";
import { wsAuthMiddleware } from "./ws.auth";
import { attachWsContext } from "./ws.context";
import { wsRateLimitMiddleware } from "./ws.limit";
import { wsLoggerMiddleware } from "./ws.logger";

export const initWebSocket = (io: Server) => {
  io.use((socket, next) => {
    attachWsContext(socket);
    next();
  });

  io.use(wsLoggerMiddleware);
  io.use(wsAuthMiddleware);
  io.use(wsRateLimitMiddleware);

  io.on("connection", (socket) => {
    socket.emit("WS_READY", {
      ts: Date.now(),
    });
  });
};
