const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.on('connection', () => {

    console.log("someone connected")
});
server.listen(3100);