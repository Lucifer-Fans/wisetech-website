import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

/* ================= NEWS UPLOAD ================= */
const newsStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "news",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const uploadNews = multer({ storage: newsStorage });

/* ================= TEAM UPLOAD ================= */
const teamStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "team",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const uploadTeam = multer({ storage: teamStorage });

/* ================= PROJECT UPLOAD ================= */
const projectStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "projects",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export const uploadProject = multer({ storage: projectStorage });
