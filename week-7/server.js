import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routes from './route/routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app); 
const io = new Server(httpServer); 

import { connectDB } from './db.js';
connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/', routes);

//socket
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('convert', (data) => {
        console.log('Conversion data received:', data);
        socket.emit('conversionResult', { result: 'conversion done' });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3010;
httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
