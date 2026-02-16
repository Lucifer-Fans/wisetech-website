import Project from "../models/Project.js";

/* SLUG UTILS */
const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* CREATE */
export const createProject = async (req, res) => {
  const coverimg = req.files?.coverimg?.[0]?.path;
  const images = req.files?.images?.map(f => f.path) || [];
  const slug = slugify(req.body.title); // ✅ NEW

  const project = await Project.create({
    ...req.body,
    slug: slugify(req.body.title),   // ✅ ADD THIS
    category: req.body.category?.toLowerCase(), // ✅ normalize
    coverimg,
    images
  });

  res.status(201).json(project);
};

/* UPDATE */
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // const updateData = { ...req.body };
    const {
      title,
      category,
      description,
      location,
      service,
      architect,
      client,
      area,
      status,
    } = req.body;

    const updateData = {
      title,
      category: category?.toLowerCase(),
      description,
      location,
      service,
      architect,
      client,
      area,
      status,
      slug: title ? slugify(title) : project.slug, // ✅ NEW
    };

    /* -------- COVER IMAGE -------- */
    if (req.files?.coverimg?.length) {
      updateData.coverimg = req.files.coverimg[0].path;
    } else {
      updateData.coverimg = project.coverimg; // keep old
    }

    /* -------- GALLERY IMAGES (REPLACE BY INDEX 🔥) -------- */
    let finalImages = [...(project.images || [])];

    if (req.files?.images?.length) {
      const newImages = req.files.images.map(f => f.path);

      // indexes sent from frontend
      let indexes = req.body.imageIndexes || [];

      // normalize single value
      if (!Array.isArray(indexes)) {
        indexes = [indexes];
      }

      indexes = indexes.map(i => Number(i));

      newImages.forEach((imgPath, i) => {
        const targetIndex = indexes[i];

        if (Number.isInteger(targetIndex)) {
          finalImages[targetIndex] = imgPath; // 🔥 REPLACE
        } else {
          finalImages.push(imgPath); // fallback add
        }
      });
    }

    updateData.images = finalImages;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    console.error("Update project error:", err);
    res.status(500).json({ message: "Update failed" });
  }
};

/* DELETE */
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

/* FRONTEND */
export const getProjects = async (req, res) => {
  const { category } = req.query;
  const filter = category ? { category: category.toLowerCase() } : {};
  res.json(await Project.find(filter).sort({ createdAt: 1 }));
};

/* 🔥 GET PROJECT BY SLUG (NEW) */
export const getProjectBySlug = async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ message: "Not found" });

  const list = await Project.find({ category: project.category }).sort({
    createdAt: 1,
  });

  const index = list.findIndex((p) => p.slug === project.slug);

  res.json({
    project,
    prev: index > 0 ? list[index - 1] : null,
    next: index < list.length - 1 ? list[index + 1] : null,
  });
};

/* GET PROJECT BY ID (ADMIN / EDIT MODE) */
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ project });
  } catch (err) {
    console.error("Get project by ID error:", err);
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

/* ADMIN */
export const adminProjects = async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;

  page = Math.max(Number(page), 1);
  limit = Math.max(Number(limit), 1);

  const query = {
    title: { $regex: search, $options: "i" },
  };

  const total = await Project.countDocuments(query);

  const data = await Project.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ total, data });
};