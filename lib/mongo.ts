import mongoose, { Connection } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error(
    'Please define the MONGODB_URL environment variable inside .env.local'
  );
}

// Define a cache type for TypeScript safety
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Use Node.js global object for caching the connection across hot reloads
let cached: MongooseCache = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

const dbConnect = async (): Promise<Connection> => {
  // If a connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a promise does not exist, create a new connection promise
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable buffer commands
    };

    cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
      return mongoose.connection; // Return connection directly
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default dbConnect;
