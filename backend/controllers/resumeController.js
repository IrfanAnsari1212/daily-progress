import Resume from "../models/Resume.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const emptyResume = { skills: [], certifications: [], projects: [] };

export const getResume = asyncHandler(async (req, res) => {
  res.json((await Resume.findOne({ userId: req.user._id })) || emptyResume);
});

export const saveResume = asyncHandler(async (req, res) => {
  const values = Object.fromEntries(["skills", "certifications", "projects"].map((field) => [
    field, Array.isArray(req.body[field]) ? req.body[field].map((value) => String(value).trim()).filter(Boolean) : []
  ]));
  const resume = await Resume.findOneAndUpdate({ userId: req.user._id }, values, { new: true, upsert: true });
  res.json(resume);
});
