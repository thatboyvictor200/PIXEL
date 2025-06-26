import { useEffect, useState } from "react";
import socket from "../socket";

interface Message {
  id: string;
  text: string;
  sender: string;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="flex flex-col gap-2 h-full overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div key={index} className="bg-gray-200 px-3 py-2 rounded-md">
          <span className="font-semibold">{msg.sender}: </span>
          <span>{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
