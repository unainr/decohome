import mongoose, { Connection } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Please define the MONGODB_URL environment variable in .env.local");
}

// Declare an interface for the cached connection
interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Assign globalThis to cache the connection
let cached: MongooseCache = (globalThis as any).mongoose || { conn: null, promise: null };

if (!cached) {
  cached = { conn: null, promise: null };
  (globalThis as any).mongoose = cached; // Assign to globalThis so it's reused across hot reloads
}

const dbConnect = async (): Promise<Connection> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    // Now ensure the promise resolves to a `mongoose.Connection`
    cached.promise = mongoose.connect(MONGODB_URL, options).then((mongooseInstance) => {
      return mongooseInstance.connection; // Return the connection from Mongoose instance
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset promise in case of failure
    throw error;
  }

  return cached.conn;
};

export default dbConnect;
