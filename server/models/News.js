import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
    category: String,
    image: String,
    shortdescription: String,
    link: String
  },
  { timestamps: true }
);

export default mongoose.model("News", NewsSchema);
