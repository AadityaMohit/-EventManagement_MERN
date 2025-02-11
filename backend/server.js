require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/event");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.json());
app.use(cors());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI is not defined in .env file!");
  process.exit(1); // Exit if no URI is found
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// WebSockets for real-time updates
io.on("connection", (socket) => {
  console.log("🔵 User connected:", socket.id);

  // Join event room
  socket.on("join_event", (eventId) => {
    socket.join(eventId);
    console.log(`👤 User joined event: ${eventId}`);
  });

  // Notify attendees in real time
  socket.on("attend_event", (eventId) => {
    io.to(eventId).emit("update_attendees", eventId);
    console.log(`🔄 Attendee list updated for event: ${eventId}`);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
