import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true, index: true }, // ✅ NEW
    category: {
      type: String,
      enum: [
        "international-projects",
        "special-design",
        "green-building",
        "heritage-building",
        "government",
        "mivan-formwork",
        "electrical-audit",
        "moef-crz",
        "high-rise",
        "commercial-building",
        "township-planning",
        "residential-building",
        "bungalows-rowhouse-duplex",
        "hotel-and-restaurant",
        "hospital",
        "mall",
        "industrial",
        "institutional",
        "religious-monuments",
        "interior"
      ],
      lowercase: true,
      trim: true
    },
    location: String,
    service: String,
    architect: String,
    client: String,
    area: String,
    status: { type: String, enum: ["Ongoing", "Pending", "Completed"] },
    description: String,
    coverimg: String,
    images: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);