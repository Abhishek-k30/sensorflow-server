
import mongoose from 'mongoose';

const sensorSchema = new mongoose.Schema({
  name: String,
  apiKey: { type: String, unique: true }
});

const Sensor = mongoose.model('Sensor', sensorSchema);
export default Sensor;
