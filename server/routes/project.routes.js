import express from "express";
import {
  createProject,
  updateProject,
  deleteProject,
  getProjects,
  getProjectBySlug, // ✅ NEW
  getProjectById,
  adminProjects
} from "../controllers/project.controller.js";
import { adminAuth } from "../middleware/auth.middleware.js";
import { uploadProject } from "../middleware/upload.middleware.js";

const router = express.Router();

/* FRONTEND */
router.get("/", getProjects);
router.get("/slug/:slug", getProjectBySlug); // ✅ NEW

/* ADMIN / EDIT SUPPORT */
router.get("/:id", getProjectById); //

/* ADMIN (🔥 FIXED ORDER 🔥) */
router.get("/admin/list", adminAuth, adminProjects);

router.post(
  "/",
  adminAuth,
  uploadProject.fields([
    { name: "coverimg", maxCount: 1 },
    { name: "images", maxCount: 20 }
  ]),
  createProject
);

router.put(
  "/:id",
  adminAuth,
  uploadProject.fields([
    { name: "coverimg", maxCount: 1 },
    { name: "images", maxCount: 20 }
  ]),
  updateProject
);

router.delete("/:id", adminAuth, deleteProject);

export default router;
