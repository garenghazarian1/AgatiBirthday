import { connectToDatabase } from "@/lib/mongodb";
import RSVP from "@/models/RSVP";

// ✅ GET: Fetch All RSVPs (Sorted by latest)
export async function GET() {
  try {
    await connectToDatabase();
    const rsvps = await RSVP.find().sort({ createdAt: -1 });

    return new Response(JSON.stringify(rsvps), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ Error fetching RSVPs:", error);
    return new Response(
      JSON.stringify({
        error: "❌ Failed to fetch RSVPs",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ DELETE: Remove an RSVP (Requires `id`)
export async function DELETE(req) {
  try {
    await connectToDatabase();
    const { id } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "❌ Missing RSVP ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const deletedRSVP = await RSVP.findByIdAndDelete(id);

    if (!deletedRSVP) {
      return new Response(JSON.stringify({ error: "❌ RSVP not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("✅ RSVP deleted:", deletedRSVP);

    return new Response(
      JSON.stringify({ message: "✅ RSVP deleted successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error deleting RSVP:", error);
    return new Response(
      JSON.stringify({
        error: "❌ Failed to delete RSVP",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// ✅ PUT: Update an RSVP (Requires `id`)
export async function PUT(req) {
  try {
    await connectToDatabase();
    const { id, name, phone, email, guests, comment } = await req.json();

    if (!id) {
      return new Response(JSON.stringify({ error: "❌ Missing RSVP ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updatedRSVP = await RSVP.findByIdAndUpdate(
      id,
      { name, phone, email, guests, comment },
      { new: true }
    );

    if (!updatedRSVP) {
      return new Response(JSON.stringify({ error: "❌ RSVP not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("✅ RSVP updated:", updatedRSVP);

    return new Response(
      JSON.stringify({
        message: "✅ RSVP updated successfully!",
        data: updatedRSVP,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("❌ Error updating RSVP:", error);
    return new Response(
      JSON.stringify({
        error: "❌ Failed to update RSVP",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
