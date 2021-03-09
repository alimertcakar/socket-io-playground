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
        console.log(msg)
    })
    console.log("A new client connected:" + Date(Date.now).toLocaleString())
});
server.listen(3100);