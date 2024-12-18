"use client"
import React, {useEffect, useMemo, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Card, CardHeader, CardContent, CardFooter} from "@/components/ui/card";
import {ScrollArea} from "@/components/ui/scroll-area";

interface Messages {
  sender?: string
  receiver?: string
}

function Page() {

  const [socketId, setSocketId] = useState<string>("");
  const [roomName, setRoomName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [toSocketId, setToSocketId] = useState<string>("");

  const [messages, setMessages] = useState<Array<Messages>>([{
    sender: "Hi",
    receiver: "Hello "
  }]);

  const socket: Socket = useMemo(() =>
      io(process.env.NEXT_PUBLIC_SERVER_ORIGIN, {
        withCredentials: true,
      })
    , []);

  useEffect(() => {

    socket.on("connect", () => {
      setSocketId(String(socket.id));
      console.log(`Socked ${socket.id} successfully connected`)
    })

    socket.on("receive-message", (message: string) => {
      console.log(message);

      setMessages((prev: Array<Messages>) => {
        const receive: Messages = prev.slice(-1)[0];
        receive.receiver = message;

        return [...prev];
      })
    })

    return () => {
      console.log(`Socket disconnected successfully`);
      socket.connected && socket.disconnect();
    }
  }, []);

  useEffect(() => {
    console.log(messages)
  }, [messages]);

  const handleJoinRoom = (e: any) => {
    e.preventDefault();
    // Logic for joining a room
    console.log("Joined Room:", roomName);
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const newMessage = {
      sender: message,
    };

    setMessages(prev => [...prev, newMessage])
    socket.emit("message", message, socket.id);

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
                <Button type={"submit"} className="bg-blue-500">
                  SEND
                </Button>
              </form>
            </div>
          </CardContent>

          <CardFooter className={"w-full"}>
            {/* Messages Display Area */}
            <div className="w-full h-96 border border-gray-200 rounded-md p-2 dark:border-gray-700 overflow-scroll overflow-x-clip">
              <ul className="space-y-2 w-full">
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className="flex justify-between p-2 rounded-md bg-gray-50 dark:bg-gray-800"
                  >
                    <div className="w-full flex flex-col  justify-between items-center p-2">
                      {/* Sender */}
                      <span
                        className="font-semibold p-2 rounded-sm self-start mr-4 text-gray-700 dark:text-gray-300
                         text-left w-11/12 break-words"
                      >
                        {msg.sender}
                      </span>

                      {/* Receiver */}
                      {msg.receiver && (
                        <span
                          className="p-2 rounded-sm ml-4 font-semibold self-end text-gray-700 dark:text-gray-300
                          text-right bg-blue-200 w-11/12 break-words "
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