import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  const enquiry = await Enquiry.create(req.body);
  res.status(201).json(enquiry);
};

export const getEnquiries = async (req, res) => {
  const filter = {};
  if (req.query.viewed) filter.viewed = req.query.viewed;
  if (req.query.starred) filter.starred = req.query.starred;
  res.json(await Enquiry.find(filter));
};

export const getEnquiryById = async (req, res) => {
  const enquiry = await Enquiry.findById(req.params.id);

  if (!enquiry) {
    return res.status(404).json({ message: "Enquiry not found" });
  }

  res.json(enquiry);
};

export const deleteEnquiry = async (req, res) => {
  await Enquiry.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
};

export const markViewed = async (req, res) => {
  await Enquiry.findByIdAndUpdate(req.params.id, { viewed: true });
  res.sendStatus(200);
};

export const toggleStar = async (req, res) => {
  await Enquiry.findByIdAndUpdate(req.params.id, req.body);
  res.sendStatus(200);
};
