import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const sensorSchema = new mongoose.Schema({
    name: String,
    apiKey: { type: String, unique: true }
});

const Sensor = mongoose.model("Sensor", sensorSchema);

const addSensor = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        const existing = await Sensor.findOne({ apiKey: "abc123" });
        if (existing) {
            console.log("Sensor with API key 'abc123' already exists.");
            return process.exit();
        }

        const sensor = new Sensor({
            name: "Test Sensor",
            apiKey: "abc123"
        });

        await sensor.save();
        console.log("Sensor added:", sensor);
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        mongoose.connection.close();
    }
};

addSensor();
