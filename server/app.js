import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
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
    credentials: true
  }
});

io.on("connection", (socket)=> {
  console.log("Connected to socket ", socket.id);

  socket.on("message", (message, id) => {
    console.log({message, id});
    io.to(id).emit("receive-message", message);

  });



  socket.on("join-room", (rooName) => {
    socket.join(rooName);

    console.log(`Room ${rooName} joined successfully`);
  })

  socket.on("send-room-message", (roomName, message) => {
    socket.to(roomName).emit(message);
  })

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  })

})


server.listen(port, () => {
  console.log("Server running at port ", port);
})

