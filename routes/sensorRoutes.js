
import express from 'express';
import { postSensorData, getSensorData } from '../controllers/sensorController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/data', authenticate, postSensorData);
router.get('/data', getSensorData);

export default router;
