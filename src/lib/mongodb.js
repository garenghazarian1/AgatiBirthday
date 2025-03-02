import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // Get MongoDB URI from .env file

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is missing in .env file");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB Connected!");
  return cached.conn;
}
