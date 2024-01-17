import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedConnection: mongoose.Connection | null = null;

async function dbConnect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  if (!cachedConnection) {
    const connection = await mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
    cachedConnection = connection.connection;
  }

  return cachedConnection;
}

export default dbConnect;
