import mongoose from "mongoose";

const TeamFunSchema = new mongoose.Schema(
  {
    title: String,
    category: { type: String, enum: ["sport", "outing", "celebration", "training"] },
    date: String,
    images: [String]
  },
  { timestamps: true }
);

export default mongoose.model("TeamFun", TeamFunSchema);
