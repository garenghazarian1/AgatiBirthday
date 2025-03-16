import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import RSVP from "@/models/RSVP";

// ✅ Function to Convert Array to CSV Format
const convertToCSV = (data) => {
  const headers = ["Name", "Guests", "Comment", "Submitted At"];
  const rows = data.map((rsvp) => [
    rsvp.name,
    rsvp.guests,
    rsvp.comment || "",
    new Date(rsvp.createdAt).toLocaleString(), // ✅ Format Date
  ]);

  return [headers, ...rows].map((row) => row.join(",")).join("\n");
};

// ✅ Handle GET Request to Export RSVPs
export async function GET() {
  try {
    await connectToDatabase();
    const rsvps = await RSVP.find();

    if (!rsvps.length) {
      return new NextResponse("No RSVPs found.", { status: 404 });
    }

    const csvData = convertToCSV(rsvps);

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="RSVPs.csv"',
      },
    });
  } catch (error) {
    console.error("❌ Error exporting RSVPs:", error);
    return new NextResponse("Error exporting CSV", { status: 500 });
  }
}
