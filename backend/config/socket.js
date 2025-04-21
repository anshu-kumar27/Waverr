const app = require('../app')
const http = require('http')
const {Server} = require('socket.io')
const cors = require('cors');

const server = http.createServer(app);

//creating server with cors 
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    },
    transports: ["websocket", "polling"],
})

//mapping online users 
let onlineUsers = {};

io.on("connection", (socket) => {
    console.log("a user has been connected to the socket ", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId != undefined) onlineUsers[userId]= socket.id;

    io.emit('getOnlineUsers', Object.keys(onlineUsers));

    socket.on("disconnect", () => {
        console.log("a user has been disconnected from the socket ", socket.id);
        delete onlineUsers[userId];
        io.emit('getOnlineUsers', Object.keys(onlineUsers));
    })
})

exports.getReceiverSocketId = (userId) =>{
    return onlineUsers[userId];
}

module.exports = { io, server };