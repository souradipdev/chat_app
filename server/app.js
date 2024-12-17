import express from "express";
import {Server} from "socket.io";
import {createServer} from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import env from "dotenv";

env.config();
const port = 8000;

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.get("/", (req, res) => {
  res.send("Hi Souradip!");
});

io.on("connection", (socket)=> {
  console.log("Connected to socket ", socket.id);

  io.emit("connected", "Connected successfully");

  socket.on("message", ({id, message}) => {
    console.log(id, message);
    socket.emit(message);

  })

})


server.listen(port, () => {
  console.log("Server running at port ", port);
})

