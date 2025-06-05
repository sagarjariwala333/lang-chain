import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lang-chain';

export const connect = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
