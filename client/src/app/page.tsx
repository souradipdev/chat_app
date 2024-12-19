"use client";
import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent} from "@/components/ui/card";

interface Message {
  text: string;
  sender: "user" | "receiver";
}

function ChatPage() {
  const [socketId, setSocketId] = useState<string | undefined>("");
  const [roomName, setRoomName] = useState<string>("");
  const [toSocketId, setToSocketId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_SERVER_ORIGIN, {
      withCredentials: true,
    });

    const socket: Socket = socketRef.current;

    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log(`Socket ${socket.id} successfully connected`);
    });

    socket.on("receive-message", (receivedMessage: string) => {
      console.log("Received Message: ", receivedMessage);
      setMessages((prev) => [...prev, { text: receivedMessage, sender: "receiver" }]);
    });

    socket.on("receive-room-message", (roomMessage: string) => {
      console.log("Room Message: ", roomMessage);
      setMessages((prev) => [...prev, { text: roomMessage, sender: "receiver" }]);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
      console.log(`Socket disconnected successfully`);
    };
  }, []);

  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Joined Room:", roomName);
    socketRef.current?.emit("join-room", roomName);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    socketRef.current?.emit("message", message, toSocketId);
    setMessage("");
  };

  const handleSendRoomMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    socketRef.current?.emit("send-room-message", roomName, message);
    setMessage("");
  };

  return (
    <div className="bg-gray-100 text-gray-900 h-screen w-screen flex items-center justify-center">
      <Card className="w-3/5 h-full flex flex-col shadow-md">
        <CardHeader className="px-4 py-2 bg-blue-500 text-white text-center">
          <h2 className="text-lg font-semibold">Chat Room</h2>
          <p className="text-sm">Socket ID: {socketId}</p>
        </CardHeader>

        <CardContent className="p-4 space-y-4">
          {/* Join Room Form */}
          <form onSubmit={handleJoinRoom} className="flex items-center gap-2">
            <Input
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-green-500">
              Join Room
            </Button>
          </form>

          {/* Direct Message Form */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              placeholder="Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="To Socket ID"
              required
              value={toSocketId}
              onChange={(e) => setToSocketId(e.target.value)}
              className="w-1/3"
            />
            <Button type="submit" className="bg-blue-500">
              Send
            </Button>
          </form>

          {/* Room Message Form */}
          <form onSubmit={handleSendRoomMessage} className="flex items-center gap-2">
            <Input
              placeholder="Message"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Room Name"
              required
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-1/3"
            />
            <Button type="submit" className="bg-blue-500">
              Send to Room
            </Button>
          </form>
        </CardContent>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-2 w-full">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex  break-words ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg shadow-md ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ChatPage;
