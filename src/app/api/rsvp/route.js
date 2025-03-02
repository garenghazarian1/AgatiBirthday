import { connectToDatabase } from "@/lib/mongodb";
import RSVP from "@/models/RSVP";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { name, email, guests } = await req.json();

    // ✅ Validate the data
    if (!name || !email || !guests) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // ✅ Save RSVP to MongoDB
    const newRSVP = new RSVP({ name, email, guests });
    await newRSVP.save();

    return new Response(
      JSON.stringify({ message: "✅ RSVP saved successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "❌ Failed to save RSVP",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
