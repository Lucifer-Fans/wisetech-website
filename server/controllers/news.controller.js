import News from "../models/News.js";

/* ================= CREATE ================= */
export const createNews = async (req, res) => {
  const image = req.file ? req.file.path : "";

  const news = await News.create({
    ...req.body,
    image
  });

  res.status(201).json(news);
};

/* ================= DELETE ================= */
export const deleteNews = async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

/* ================= FRONTEND ================= */
export const getNews = async (req, res) => {
  res.json(await News.find().sort({ createdAt: -1 }));
};

/* ================= ADMIN DASHBOARD ================= */
export const adminNews = async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;

  page = Math.max(Number(page), 1);
  limit = Math.max(Number(limit), 1);

  const query = {
    title: { $regex: search, $options: "i" },
  };

  const total = await News.countDocuments(query);

  const data = await News.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ total, data });
};