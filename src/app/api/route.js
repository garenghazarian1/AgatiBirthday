import { connectToDatabase } from "@/lib/mongodb";
import RSVP from "@/models/RSVP";

export async function POST(req) {
  try {
    await connectToDatabase();

    let data;
    try {
      data = await req.json();
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid JSON format" }), {
        status: 400,
      });
    }

    const { name, guests, comment = "" } = data; // ✅ Ensure comment is included

    if (!name || !guests) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const newRSVP = new RSVP({ name, guests, comment }); // ✅ Now comment is saved
    await newRSVP.save();

    return new Response(
      JSON.stringify({ message: "RSVP saved successfully!" }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("❌ Error saving RSVP:", error);
    return new Response(JSON.stringify({ error: "Failed to save RSVP" }), {
      status: 500,
    });
  }
}
