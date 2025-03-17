import { connectToDatabase } from "@/lib/mongodb";
import Comment from "@/models/Comment.js";

export async function GET() {
  await connectToDatabase();
  const comments = await Comment.find().sort({ createdAt: -1 });
  return Response.json(comments);
}

export async function POST(req) {
  await connectToDatabase();
  const { name, comment } = await req.json();

  const newComment = await Comment.create({ name, comment });
  return Response.json({ ...newComment.toObject(), commentId: newComment._id });
}

export async function PUT(req) {
  await connectToDatabase();
  const { id, comment } = await req.json();

  await Comment.findByIdAndUpdate(id, { comment });
  return Response.json({ success: true });
}

export async function DELETE(req) {
  await connectToDatabase();
  const { id } = await req.json();

  await Comment.findByIdAndDelete(id);
  return Response.json({ success: true });
}
