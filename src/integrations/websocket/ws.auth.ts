import logger from "@/logger";
import { Socket } from "socket.io";
import { getWsContext } from "./ws.context";

const BEARER_TOKEN = process.env.TOKEN;

export const wsAuthMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  try {
    const token =
      socket.handshake.auth?.token || socket.handshake.headers?.authorization;

    if (token && token === BEARER_TOKEN) {
      getWsContext(socket).verified = true;
    } else {
      getWsContext(socket).verified = false;
      logger.warn("ws.auth.failed", { token });
      next(new Error("Unauthorized"));
      return;
    }

    next();
  } catch (err) {
    logger.warn("ws.auth.failed", { err });
    next(err);
  }
};
