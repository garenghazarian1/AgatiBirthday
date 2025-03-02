import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

// Define RSVP Schema
const rsvpSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    guests: Number,
  },
  { timestamps: true }
);

const RSVP = mongoose.models.RSVP || mongoose.model("RSVP", rsvpSchema);

// ✅ Handle RSVP POST request
export async function POST(req) {
  try {
    const { name, email, guests } = await req.json();
    await connectToDatabase();

    const newRSVP = new RSVP({ name, email, guests });
    await newRSVP.save();

    return Response.json(
      { message: "✅ RSVP saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error saving RSVP:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ Handle RSVP GET request
export async function GET() {
  try {
    await connectToDatabase();
    const rsvps = await RSVP.find();
    return Response.json(rsvps, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching RSVPs:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// ✅ Handle unsupported methods
export async function DELETE() {
  return Response.json(
    { error: "❌ DELETE method not allowed" },
    { status: 405 }
  );
}
