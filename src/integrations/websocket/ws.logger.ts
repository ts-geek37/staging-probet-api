import logger from "@/logger";
import { Socket } from "socket.io";

export const wsLoggerMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  logger.info("ws.connected", {
    id: socket.id,
    ip: socket.handshake.address,
  });

  socket.on("disconnect", (reason) => {
    logger.info("ws.disconnected", {
      id: socket.id,
      reason,
    });
  });

  next();
};
