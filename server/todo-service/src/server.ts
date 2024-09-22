import express from 'express';
import cors from 'cors';  // Import the CORS middleware
import todoRoutes from './routes/todoRoutes';
import db from './config/database';

const app = express();

// Use CORS middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // Allows sending cookies with CORS requests
}));

app.use(express.json());  // Parse JSON requests

// Use the todo routes
app.use('/api',todoRoutes);

// Sync the database and start the server
db.sync()
  .then(() => { console.log('Database synced');

  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`Todo service running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Error syncing database:', err);
});
