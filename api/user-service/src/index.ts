import express from 'express';
import userRoutes from './routes/user.routes';
import { connect } from 'api-shared/utils'

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Start server function
const startServer = async () => {
  try {
    await connect();
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`User service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
