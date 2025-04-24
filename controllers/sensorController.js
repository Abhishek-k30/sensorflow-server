
import SensorData from '../models/SensorData.js';
import Sensor from '../models/Sensor.js';

export async function postSensorData(req, res) {
  try {
    const data = new SensorData({
      ...req.body,
      sensorId: req.sensor._id
    });
    await data.save();
    res.status(201).json({ message: 'Data saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getSensorData(req, res) {
  const { apiKey } = req.query;

  if (!apiKey) {
    return res.status(400).json({ message: 'Missing apiKey in query' });
  }

  try {
    const sensor = await Sensor.findOne({ apiKey });

    if (!sensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }

    const data = await SensorData.find({ sensorId: sensor._id }).sort({ timestamp: -1 });

    if (!data.length) {
      return res.status(404).json({ message: 'No sensor data found for this sensor' });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

