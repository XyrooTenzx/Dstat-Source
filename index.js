const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let dstatRequestCount = 0;

app.use((req, res, next) => {
    if (req.path === '/dstat') {
        dstatRequestCount++;
    }
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

setInterval(() => {
    const update = {
        count: dstatRequestCount,
        timestamp: new Date().toISOString()
    };
   // console.log('Sending update:', update);
    io.emit('dstatUpdate', update);
    dstatRequestCount = 0;
}, 1000);

const PORT = 4555;
server.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));