// routes.js
import express from 'express';
import { convertTemperature } from '../controllers/conversionController.js';

const router = express.Router();

// POST route for temperature conversion
router.post('/convert', convertTemperature);

export default router;
