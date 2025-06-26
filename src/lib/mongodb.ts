import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

async function dbConnect() {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return;
  }
  // Use new db connection
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000, // Increased timeout to 15 seconds
      socketTimeoutMS: 45000, // Increased socket timeout to 45 seconds
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default dbConnect;
