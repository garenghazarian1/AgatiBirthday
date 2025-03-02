import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

// Define RSVP Schema
const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    guests: { type: Number, required: true },
  },
  { timestamps: true }
);

const RSVP = mongoose.models.RSVP || mongoose.model("RSVP", rsvpSchema);

// ✅ Handle CORS Configuration
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allows any origin
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ✅ Handle OPTIONS Preflight Request
export async function OPTIONS() {
  return Response.json({}, { status: 200, headers: corsHeaders });
}

// ✅ Handle RSVP POST request
export async function POST(req) {
  try {
    const { name, email, guests } = await req.json();

    if (!name || !email || !guests) {
      return Response.json(
        { error: "❌ Missing required fields" },
        { status: 400, headers: corsHeaders }
      );
    }

    await connectToDatabase();

    const newRSVP = new RSVP({ name, email, guests });
    await newRSVP.save();

    return Response.json(
      { message: "✅ RSVP saved successfully!" },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Error saving RSVP:", error);
    return Response.json(
      { error: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ Handle RSVP GET request
export async function GET() {
  try {
    await connectToDatabase();
    const rsvps = await RSVP.find();
    return Response.json(rsvps, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error("❌ Error fetching RSVPs:", error);
    return Response.json(
      { error: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
