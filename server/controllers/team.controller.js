import TeamFun from "../models/TeamFun.js";

/* ================= CREATE ================= */
export const createTeamFun = async (req, res) => {
  const images = req.files?.map((f) => f.path) || [];

  const team = await TeamFun.create({
    ...req.body,
    images
  });

  res.status(201).json(team);
};

/* ================= DELETE ================= */
export const deleteTeamFun = async (req, res) => {
  await TeamFun.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

/* ================= FRONTEND ================= */
export const getTeamFun = async (req, res) => {
  res.json(await TeamFun.find().sort({ createdAt: -1 }));
};

/* ================= ADMIN DASHBOARD ================= */
export const adminTeamFun = async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;

  page = Math.max(Number(page), 1);
  limit = Math.max(Number(limit), 1);

  const query = {
    title: { $regex: search, $options: "i" },
  };

  const total = await TeamFun.countDocuments(query);

  const data = await TeamFun.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);

  res.json({ total, data });
};
