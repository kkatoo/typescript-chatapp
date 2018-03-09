import express from 'express';
import socketio from 'socket.io';
import { createServer, Server } from 'http';

const app = express();
const server = createServer(app);
const io = socketio(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connect', (socket) => {
    console.log("connected");
    socket.on('message', (message) => {
        io.emit('message', message);
    })

    socket.on('disconnect', () => {
        console.log('disconnected');
    })
});

server.listen(3000);