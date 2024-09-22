import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes'
import db from './config/database';

// Initialize the app
const app: Application = express();

// Enable CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
); 

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api', routes);

// Connect to the database
db.sync()
  .then(() => console.log('Database connected'))
  .catch((err: Error) => console.error('Error: ', err));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
