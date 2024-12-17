"use client"
import React, {useEffect, useMemo, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

interface Message {
  sender?: string
  receiver?: string
}

function Page() {

  const [socketId, setSocketId] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [toSocketId, setToSocketId] = useState<string>("");

  const [messages, setMessages] = useState<Array<Message>>([]);

  const socket: Socket = useMemo(() =>
      io(process.env.NEXT_PUBLIC_SERVER_ORIGIN, {
        withCredentials: true
      })
    , []);

  useEffect(() => {

    socket.on("connect", () => {
      setSocketId(String(socket.id));
      console.log(`Socked ${socket.id} successfully connected`)
    })

    socket.on("message-recv", ({receiver}: Message) => {
      setMessages((prev: Array<Message>) => [...prev, {receiver}])
    })

    return () => {
      socket.connected && socket.disconnect();
    }
  }, []);


  const handleJoinRoom = () => {
    // Logic for joining a room
    console.log("Joined Room:", roomName);
  };

  const handleSendMessage = () => {
    const newMessage = {
      sender: message,
    };

    socket.emit("message", newMessage, socket.id);
    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
  };


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
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Room Name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleJoinRoom} className="bg-blue-500">
                  JOIN
                </Button>
              </div>

              {/* Message Input */}
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <Input
                  placeholder="To Socket ID"
                  value={toSocketId}
                  onChange={(e) => setToSocketId(e.target.value)}
                  className="w-1/3"
                />
                <Button onClick={handleSendMessage} className="bg-blue-500">
                  SEND
                </Button>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            {/* Message Display Area */}
            <ScrollArea className="w-full h-48 border border-gray-200 rounded-md p-2 dark:border-gray-700">
              <ul className="space-y-2">
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="w-full flex justify-between items-center p-2">
                      {/* Sender (left-aligned) */}
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        {msg.sender}
                      </span>

                      {/* Receiver (right-aligned) */}
                      <span className="ml-4 font-semibold text-gray-700 dark:text-gray-300">
                        {msg.receiver}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Page;