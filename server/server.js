const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

// Replace with your actual frontend origin:
const FRONTEND_ORIGIN = "https://5173-firebase-pixel-1750946509085.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev";

const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("Pixel Chat Backend is running");
});

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
