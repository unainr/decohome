import mongoose, { Connection } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable in .env.local");
}

interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Declare a global variable to store the connection cache
let cached: MongooseCache = (globalThis as any).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  (globalThis as any).mongoose = cached;
}

const dbConnect = async (): Promise<Connection> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // Initiate the connection without deprecated options
    cached.promise = mongoose.connect(MONGODB_URL).then((mongooseInstance) => {
      return mongooseInstance.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
};

export default dbConnect;
