
import Sensor from '../models/Sensor.js';

export default async function authenticate(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(403).json({ error: 'API key required' });

  const sensor = await Sensor.findOne({ apiKey });
  if (!sensor) return res.status(403).json({ error: 'Invalid API key' });

  req.sensor = sensor;
  next();
}
