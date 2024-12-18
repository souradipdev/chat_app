"use client";
import React, {useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";

interface Messages {
  sender?: string;
  receiver?: string;
}

function Page() {
  const [socketId, setSocketId] = useState<string | undefined>("");
  const [roomName, setRoomName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [toSocketId, setToSocketId] = useState<string>("");

  const [messages, setMessages] = useState<Array<Messages>>([]);

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

    socket.on("receive-message", (message: string) => {
      console.log(message);

      setMessages((prev: Array<Messages>) => {
        const receive: Messages = prev.slice(-1)[0];
        receive.receiver = message;
        return [...prev];
      });
    });

    socket.on("receive-room-message", (recvMessage: string) => {
      console.log("Room message ",recvMessage);

      setMessages((prev: Array<Messages>) => {
        const receive: Messages = prev.slice(-1)[0];
        receive.receiver = recvMessage;
        return [...prev];
      });
    })

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
    const newMessage = {
      sender: message,
    };

    setMessages((prev) => [...prev, newMessage]);

    socketRef.current?.emit("message", message, toSocketId);

    setMessage("");
  };

  const handleSendRoomMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMessage = {
      sender: message,
    };

    setMessages((prev) => [...prev, newMessage]);
    socketRef.current?.emit("send-room-message",roomName, message);
    setMessage("")
  }

  return (
    <div className={"bg-accent text-accent-foreground h-screen w-screen"}>
      <div className="flex flex-col items-center justify-center h-full w-full bg-gray-100 dark:bg-gray-900 ">
        {/* Card for the UI */}
        <Card className="w-full max-w-3xl shadow-md">
          <CardHeader className="text-center">
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Socket ID: <span className="text-blue-600">{socketId}</span>
            </h2>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Room Name Input */}
              <form onSubmit={handleJoinRoom} className="flex items-center gap-2">
                <Input
                  placeholder="Room Name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="flex-1"
                />
                <Button type={"submit"} className="bg-blue-500">
                  JOIN
                </Button>
              </form>

              {/* Messages Input */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Input
                  placeholder="Message"
                  required={true}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="To Socket ID"
                  required={true}
                  value={toSocketId}
                  onChange={(e) => setToSocketId(e.target.value)}
                  className="w-1/3"
                />
                <Button type={"submit"} className="bg-blue-500">
                  SEND
                </Button>
              </form>

              <form onSubmit={handleSendRoomMessage} className="flex items-center gap-2">
                <Input
                  placeholder="Message"
                  required={true}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="Room Name"
                  required={true}
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-1/3"
                />
                <Button type={"submit"} className="bg-blue-500">
                  SEND
                </Button>
              </form>
            </div>
          </CardContent>

          <CardFooter className={"w-full"}>
            {/* Messages Display Area */}
            <div
              className="w-full h-96 border border-gray-200 rounded-md p-2 dark:border-gray-700 overflow-scroll overflow-x-clip">
              <ul className="space-y-2 w-full">
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="w-full flex flex-col justify-between items-center p-2">
                      {/* Sender */}
                      <span
                        className="font-semibold p-2 rounded-sm self-start mr-4 text-gray-700 dark:text-gray-300
                         text-left min-w-fit max-w-11/12 break-words"
                      >
                        {msg.sender}
                      </span>

                      {/* Receiver */}
                      {msg.receiver && (
                        <span
                          className="p-2 rounded-sm ml-4 font-semibold self-end text-gray-700 dark:text-gray-300
                          text-right bg-blue-200 min-w-fit max-w-11/12 break-words "
                        >
                          {msg.receiver}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;
