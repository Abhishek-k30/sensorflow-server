
import SensorData from '../models/SensorData.js';

export async function dashboard(req, res) {
  const data = await SensorData.find().populate('sensorId').sort({ timestamp: -1 }).limit(50);
  res.render('dashboard', { data });
}
