const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for dev, restrict in prod)
    methods: ["GET", "POST"]
  }
});

// Store users { socketId: { lat, lng } }
let users = {};

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Listen for location updates
  socket.on("send-location", (coords) => {
    users[socket.id] = coords;
    io.emit("receive-locations", users); // send all users to everyone
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    delete users[socket.id];
    io.emit("receive-locations", users);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
