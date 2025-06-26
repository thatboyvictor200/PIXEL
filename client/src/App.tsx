import { useEffect } from "react";
import socket from "./socket";

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("🟢 Connected to backend:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected from backend");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-4 text-2xl text-green-700 font-bold">
      Pixel Chat is Live with Socket.IO 🚀
    </div>
  );
}

export default App;
