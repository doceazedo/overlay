import { io } from "socket.io-client";

export const socket = io(`http://localhost:${process.env.WS_SERVER_PORT}`);
