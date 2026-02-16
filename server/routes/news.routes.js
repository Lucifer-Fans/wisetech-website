import express from "express";
import multer from "multer";
import {
  createNews,
  deleteNews,
  getNews,
  adminNews
} from "../controllers/news.controller.js";
import { adminAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({ dest: "uploads/news" });

/* FRONTEND */
router.get("/", getNews);

/* ADMIN */
router.get("/admin/list", adminAuth, adminNews);
router.post("/", adminAuth, upload.single("image"), createNews);
router.delete("/:id", adminAuth, deleteNews);

export default router;
