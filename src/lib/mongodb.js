import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in environment variables");
}

export async function connectToDatabase() {
  try {
    if (mongoose.connection.readyState >= 1) {
      console.log("✅ Using existing MongoDB connection");
      return mongoose.connection;
    }

    await mongoose.connect(MONGODB_URI, {
      dbName: "rsvp", // Replace with your actual database name
    });

    console.log("✅ MongoDB Connected Successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
    throw new Error("Database connection failed");
  }
}
