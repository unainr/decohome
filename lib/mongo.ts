import mongoose from 'mongoose';

const MONGODB_URL:any = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.local');
}

let cached = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URL, {
            bufferCommands: false,
            maxPoolSize: 20, // Use larger pool size for better concurrency
            socketTimeoutMS: 30000, // Set socket timeout
            serverSelectionTimeoutMS: 5000, // Fail fast if server selection fails
        }).then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;