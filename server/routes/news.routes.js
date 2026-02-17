import express from "express";
import {
  createNews,
  deleteNews,
  getNews,
  adminNews
} from "../controllers/news.controller.js";
import { adminAuth } from "../middleware/auth.middleware.js";
import { uploadNews } from "../middleware/upload.middleware.js"; // ✅ Use Cloudinary

const router = express.Router();

/* FRONTEND */
router.get("/", getNews);

/* ADMIN */
router.get("/admin/list", adminAuth, adminNews);
router.post("/", adminAuth, uploadNews.single("image"), createNews); // ✅ Cloudinary upload
router.delete("/:id", adminAuth, deleteNews);

export default router;
