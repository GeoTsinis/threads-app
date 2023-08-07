import mongoose from 'mongoose';

let isConnected = false; // checks if mongoose is connected

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONDODB_URL) return console.log('MONGODB_URL not found');
  if (isConnected) return console.log('Already connected to MongoDB');

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
