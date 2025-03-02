import { connectToDatabase } from "@/lib/mongodb";
import RSVP from "@/models/RSVP";

// ✅ GET: Fetch All RSVPs
export async function GET() {
  try {
    await connectToDatabase();
    const rsvps = await RSVP.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify(rsvps), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "❌ Failed to fetch RSVPs",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

// ✅ DELETE: Remove an RSVP
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();
    await RSVP.findByIdAndDelete(id);
    return new Response(
      JSON.stringify({ message: "✅ RSVP deleted successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "❌ Failed to delete RSVP",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

// ✅ PUT: Update an RSVP
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, name, email, guests } = await req.json();

    await RSVP.findByIdAndUpdate(id, { name, email, guests });

    return new Response(
      JSON.stringify({ message: "✅ RSVP updated successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "❌ Failed to update RSVP",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
