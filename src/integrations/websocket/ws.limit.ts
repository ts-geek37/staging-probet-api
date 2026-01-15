import { Socket } from "socket.io";

const EVENT_LIMIT = 30;
const WINDOW_MS = 10_000;

export const wsRateLimitMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => {
  let count = 0;
  let windowStart = Date.now();

  socket.use((packet, nextPacket) => {
    const now = Date.now();

    if (now - windowStart > WINDOW_MS) {
      count = 0;
      windowStart = now;
    }

    count++;

    if (count > EVENT_LIMIT) {
      return nextPacket(new Error("Too many socket events, slow down"));
    }

    nextPacket();
  });

  next();
};
