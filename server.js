import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sensorRoutes from './routes/sensorRoutes.js';
import viewRoutes from './routes/viewRoutes.js';
import connectToMongoDB from './db/connectToMongoDB.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000' // where your Next.js app runs
}));

app.set('view engine', 'ejs');
app.use(express.json());

app.use('/api/sensors', sensorRoutes);
app.use('/', viewRoutes);

// connect to MongoDB and start the server
const startServer = async () => {
  await connectToMongoDB();
  app.listen(process.env.PORT || 5000, '0.0.0.0', () =>
    console.log(`Server running on port ${process.env.PORT || 5000}`)
  );

};

startServer();
