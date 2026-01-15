import "dotenv/config";
import http from "http";
import { Server } from "socket.io";

import app from "./app";
import logger from "./logger";
import { initWebSocket } from "./integrations/websocket/ws.init";
import { initLiveBroadcaster } from "./modules/liveMatches/live.broadcaster";

const PORT = Number(process.env.PORT) || 5000;

const start = () => {
  const httpServer = http.createServer(app);

  // const io = new Server(httpServer, {
  //   cors: {
  //     origin: "*",
  //   },
  // });

  // initWebSocket(io);
  // initLiveBroadcaster(io);

  httpServer.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
};

start();
