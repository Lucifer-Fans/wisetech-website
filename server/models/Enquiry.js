import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    purpose: String,
    message: String,
    viewed: { type: Boolean, default: false },
    starred: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", EnquirySchema);
