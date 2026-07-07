import mongoose from 'mongoose';
import './env';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/igentech';

export const connectDB = async (): Promise<void> => {
  try {
    const options: mongoose.ConnectOptions = {};
    if (process.env.MONGODB_USER && process.env.MONGODB_PASS) {
      options.user = process.env.MONGODB_USER;
      options.pass = process.env.MONGODB_PASS;
      options.authSource = process.env.MONGODB_AUTH_SOURCE || 'admin';
    }
    await mongoose.connect(MONGODB_URI, options);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
