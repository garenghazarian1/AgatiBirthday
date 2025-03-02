import mongoose from "mongoose";

const RSVPSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.RSVP || mongoose.model("RSVP", RSVPSchema);
