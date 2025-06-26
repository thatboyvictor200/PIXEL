const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// ✅ Use ONLY the path, NOT the full URL here
const FRONTEND_ORIGIN = "https://5173-firebase-pixel-1750946509085.cluster-axf5tvtfjjfekvhwxwkkkzsk2y.cloudworkstations.dev";

// ✅ CORS setup
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: ["GET", "POST"]
}));

// ✅ Simple test route
app.get("/", (req, res) => {
  res.send("Pixel Chat Backend is running");
});

// ✅ Socket.io setup
const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  socket.on("sendMessage", (msg) => {
    console.log("📨 Message received:", msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

// ✅ Start server
server.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
