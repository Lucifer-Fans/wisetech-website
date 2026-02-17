import express from "express";
import {
  createTeamFun,
  deleteTeamFun,
  getTeamFun,
  adminTeamFun
} from "../controllers/team.controller.js";
import { adminAuth } from "../middleware/auth.middleware.js";
import { uploadTeam } from "../middleware/upload.middleware.js"; // ✅ USE CLOUDINARY MIDDLEWARE

const router = express.Router();

/* FRONTEND */
router.get("/", getTeamFun);

/* ADMIN */
router.get("/admin/list", adminAuth, adminTeamFun);
router.post("/", adminAuth, uploadTeam.array("images"), createTeamFun); // ✅ Cloudinary upload
router.delete("/:id", adminAuth, deleteTeamFun);

export default router;
