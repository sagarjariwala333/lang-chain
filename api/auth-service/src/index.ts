import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Auth service is running on port ${port}`);
});