const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Express app setup
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// http server for socket
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});

// Online users mapping
let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected to socket:", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;

  io.emit('getOnlineUsers', Object.keys(onlineUsers));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    delete onlineUsers[userId];
    io.emit('getOnlineUsers', Object.keys(onlineUsers));
  });
});

// finding the online user socket id to send message via socket
const getReceiverSocketId = (userId) => onlineUsers[userId];


module.exports = {
  io,
  server,
  app,
  getReceiverSocketId
};