import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

// ✅ Define RSVP Schema (Now includes `phone` & `comment`)
const rsvpSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true }, // ✅ Added phone field
    email: { type: String }, // Email is now optional
    guests: { type: Number, required: true },
    comment: { type: String, default: "" }, // ✅ Added optional comment field
  },
  { timestamps: true }
);

const RSVP = mongoose.models.RSVP || mongoose.model("RSVP", rsvpSchema);

// ✅ CORS Headers (Applied only to OPTIONS request)
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ✅ Handle OPTIONS Preflight Request
export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

// ✅ Handle RSVP POST request (Saves RSVP to MongoDB)
export async function POST(req) {
  try {
    // ✅ Read request body
    const { name, phone, email, guests, comment } = await req.json();

    // ✅ Validate required fields
    if (!name || !phone || !guests) {
      return new Response(
        JSON.stringify({
          error: "❌ Missing required fields: Name, Phone, Guests",
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Connect to MongoDB
    await connectToDatabase();

    // ✅ Save RSVP to Database
    const newRSVP = new RSVP({ name, phone, email, guests, comment });
    await newRSVP.save();

    console.log("✅ RSVP saved:", newRSVP);

    return new Response(
      JSON.stringify({ message: "✅ RSVP saved successfully!", data: newRSVP }),
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Error saving RSVP:", error);
    return new Response(
      JSON.stringify({ error: "❌ Server error while saving RSVP" }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ Handle RSVP GET request (Fetches all RSVPs)
export async function GET() {
  try {
    await connectToDatabase();
    const rsvps = await RSVP.find();

    return new Response(JSON.stringify(rsvps), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("❌ Error fetching RSVPs:", error);
    return new Response(
      JSON.stringify({ error: "❌ Server error while fetching RSVPs" }),
      { status: 500, headers: corsHeaders }
    );
  }
}
