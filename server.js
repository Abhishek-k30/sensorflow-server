import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sensorRoutes from './routes/sensorRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

const app = express();


// CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:3000', // Local dev for React or Next.js frontend
    'https://sensorflow-client-sma.vercel.app/', // The actual deployed frontend URL (replace this)
    'https://sensorflow-server.onrender.com', // Backend URL if needed to allow access from itself
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
}));





app.set('view engine', 'ejs');
app.use(express.json());

app.use('/api/sensors', sensorRoutes);
app.use('/', viewRoutes);

// connect to MongoDB and start the server
const startServer = async () => {
  await connectToMongoDB();
  app.listen(process.env.PORT || 5000, () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );

};

startServer();
