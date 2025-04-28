import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  sensorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sensor', required: true },
  temperature: { type: Number, default: 0 },
  humidity: { type: Number, default: 0 },
  moisture: { type: Number, default: 0 },
  n: { type: Number, default: 0 },           // Nitrogen value
  p: { type: Number, default: 0 },           // Phosphorus value
  k: { type: Number, default: 0 },           // Potassium value
  ph: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] }, // YYYY-MM-DD
  time: { type: String, default: () => new Date().toTimeString().split(' ')[0] } // HH:MM:SS
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);
export default SensorData;