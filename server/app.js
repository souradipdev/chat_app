import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import env from "dotenv";

env.config();
const port = 8000;

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket ", socket.id);

  socket.on("join-room", (roomName) => {
    socket.join(roomName);
    console.log(`Socket  ${socket.id} connected to room ${roomName}`)
  })

  socket.on("message", (message, id, callback) => {
    console.log("Message received:", { message, id });
    if (io.sockets.sockets.get(id)) {
      io.to(id).emit("receive-message", message);
      callback(null, "Message delivered successfully.");
    } else {
      callback(new Error("Recipient not connected."));
    }
  });


  socket.on("send-room-message", (roomName, message, callback) => {
    console.log("Room Message Event Triggered:", { roomName, message }); // Debug log
    if (io.sockets.adapter.rooms.get(roomName)) {
      socket.to(roomName).emit("receive-room-message", message);
      callback(null, `Message sent to room successfully. ${message}`);
    } else {
      callback(new Error("Room does not exist."));
    }
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  });
});

server.listen(port, () => {
  console.log("Server running at port ", port);
});
