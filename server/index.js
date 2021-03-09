const { Socket } = require('dgram');
var cors = require('cors')

const app = require('express')();
app.use(cors());

const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "POST", "DELETE"]
    }
});
io.on('connection', (socket) => {
    socket.on("message", (msg) => {
        socket.broadcast.emit("message", msg);
        socket.emit("xyz");
        console.log(msg);
    })
    socket.on("IS_TYPING", (isTyping) => {
        socket.broadcast.emit("IS_TYPING", isTyping);
        if (isTyping) {
            console.log("a client started typing");
        } else {
            console.log("a client stopped typing");
        }
    })


    socket.on("disconnect", (reason) => {
        console.log("A client disconnected: " + reason);
    })
    console.log("A new client connected:" + Date(Date.now).toLocaleString())
});
server.listen(3100);