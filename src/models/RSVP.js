import mongoose from "mongoose";

const RSVPSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }, // ✅ Added phone (required)
  email: { type: String }, // ✅ Email remains optional
  guests: { type: Number, required: true },
  comment: { type: String, default: "" }, // ✅ Added comment (optional)
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.RSVP || mongoose.model("RSVP", RSVPSchema);
