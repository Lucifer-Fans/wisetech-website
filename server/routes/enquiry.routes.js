import express from "express";
import {
  createEnquiry,
  getEnquiries,
  getEnquiryById,
  deleteEnquiry,
  markViewed,
  toggleStar
} from "../controllers/enquiry.controller.js";

const router = express.Router();

router.post("/", createEnquiry);
router.get("/", getEnquiries);
router.get("/:id", getEnquiryById);
router.delete("/:id", deleteEnquiry);
router.put("/:id/view", markViewed);
router.put("/:id/star", toggleStar);

export default router;
