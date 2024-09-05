// server.js
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routes from './route/routes.js'; // Import the routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

import { connectDB } from './db.js';
connectDB();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Use the routes from routes.js
app.use('/', routes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = 3010;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
