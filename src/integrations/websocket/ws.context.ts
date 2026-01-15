import { Socket } from "socket.io";
import { WsContext } from "./ws.types";

export const attachWsContext = (socket: Socket) => {
  const ctx: WsContext = {
    socket,
    connectedAt: Date.now(),
    verified: false,
  };

  socket.data.ctx = ctx;
};

export const getWsContext = (socket: Socket): WsContext => {
  return socket.data.ctx as WsContext;
};
