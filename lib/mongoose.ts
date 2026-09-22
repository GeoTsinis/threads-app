import mongoose from 'mongoose';
import { isDemoMode } from './demo-mode';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isDemoMode()) {
    console.log('Demo mode: skipping MongoDB connection');
    return;
  }

  if (!process.env.MONGODB_URL) {
    console.log('MONGODB_URL not found');
    return;
  }
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      // Prefer least privilege; connection string itself must use a limited user.
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
