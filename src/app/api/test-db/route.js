import { connectToDatabase } from "@/lib/mongodb";
import RSVP from "@/models/RSVP";

export async function GET() {
  try {
    // ✅ Connect to MongoDB
    await connectToDatabase();

    // ✅ Count existing RSVP records
    const totalRSVPs = await RSVP.countDocuments();

    return new Response(
      JSON.stringify({ message: "✅ MongoDB connected!", totalRSVPs }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "❌ Failed to connect to MongoDB",
        details: error.message,
      }),
      {
        status: 500,
      }
    );
  }
}
