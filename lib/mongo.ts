import mongoose from 'mongoose';
// Declare global types for mongoose in a separate file (e.g., global.d.ts) or in the same file
declare global {
    var mongoose: {
      conn: any | null;
      promise: Promise<any> | null;
    };
  }
  
const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URL environment variable inside .env.local"
    );
}
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}


const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    // If a connection does not exist, check if a promise is already in progress
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect; // Make sure to export dbConnect
