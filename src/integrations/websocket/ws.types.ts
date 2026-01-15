import { Socket } from "socket.io";

export interface WsContext {
  socket: Socket;
  connectedAt: number;
  verified: boolean;
}
