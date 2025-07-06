import { Server } from "socket.io";
import http from "http";
import app from "../app";

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.on("join", (userId) => {
    socket.join(String(userId));
    console.log(`Usuário ${userId} entrou na sala`);
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

export { io, server };
