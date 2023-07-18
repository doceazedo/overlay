import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: `http://localhost:5174`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`New connection ${socket.id}`);
  socket.onAny((event: string, ...args) => {
    console.log(`Broadcasting event ${event}`);
    io.emit(event, ...args);
  });
});

const PORT = parseInt(`${process.env.WS_SERVER_PORT}`);
console.log(`Starting WS server on port ${PORT}...`);
io.listen(PORT);
