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

/*
app.get("/", (req, res) => {
  res.send("Hi Souradip!");
});
*/

io.on("connection", (socket)=> {
  console.log("Connected to socket ", socket.id);

  socket.on("message", ({from, to, content}) => {
    // console.log();
    socket.to(to).emit("message-recv", {from, to, content});
  })

  socket.on("disconnect", () => {
    console.log("Socket disconnected: ", socket.id);
  })

})


server.listen(port, () => {
  console.log("Server running at port ", port);
})

