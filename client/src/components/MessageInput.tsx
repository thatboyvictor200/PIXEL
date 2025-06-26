import { useState } from "react";
import socket from "../socket";

export default function MessageInput() {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim() !== "") {
      socket.emit("sendMessage", {
        text,
        sender: "User", // Replace with actual user/nickname later
        id: socket.id,
      });
      setText("");
    }
  };

  return (
    <div className="flex p-4 border-t gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
        className="flex-1 border rounded px-4 py-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
