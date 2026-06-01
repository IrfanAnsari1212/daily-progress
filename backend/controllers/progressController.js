import DailyProgress from "../models/DailyProgress.js";
import Streak from "../models/Streak.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { calculateScore, normalizeDate, TRACKER_FIELDS } from "../utils/scoring.js";

const updateStreak = async (userId) => {
  const records = await DailyProgress.find({ userId }).sort({ date: -1 });
  let currentStreak = 0;
  let longestStreak = 0;
  let run = 0;
  let previous = null;
  for (const record of records) {
    const day = record.date.getTime();
    const consecutive = previous === null || previous - day === 86400000;
    run = record.score >= 8 && consecutive ? run + 1 : record.score >= 8 ? 1 : 0;
    longestStreak = Math.max(longestStreak, run);
    previous = day;
  }
  let currentPrevious = null;
  const newestAllowed = normalizeDate();
  newestAllowed.setUTCDate(newestAllowed.getUTCDate() - 1);
  for (const record of records) {
    if (record.score < 8 || (currentPrevious === null && record.date < newestAllowed)) break;
    if (currentPrevious !== null && currentPrevious - record.date.getTime() !== 86400000) break;
    currentStreak += 1;
    currentPrevious = record.date.getTime();
  }
  return Streak.findOneAndUpdate({ userId }, { currentStreak, longestStreak }, { new: true, upsert: true });
};

const valuesFrom = (body) => Object.fromEntries(TRACKER_FIELDS.map((field) => [field, Boolean(body[field])]));
const customTaskFrom = (body) => {
  const taskOfDay = typeof body.taskOfDay === "string" ? body.taskOfDay.trim() : "";
  return { taskOfDay, taskOfDayCompleted: Boolean(taskOfDay && body.taskOfDayCompleted) };
};

export const listProgress = asyncHandler(async (req, res) => {
  const records = await DailyProgress.find({ userId: req.user._id }).sort({ date: -1 }).limit(120);
  const streak = await Streak.findOne({ userId: req.user._id });
  res.json({ records, streak: streak || { currentStreak: 0, longestStreak: 0 } });
});

export const createProgress = asyncHandler(async (req, res) => {
  const values = valuesFrom(req.body);
  const customTask = customTaskFrom(req.body);
  const date = normalizeDate(req.body.date);
  const record = await DailyProgress.findOneAndUpdate(
    { userId: req.user._id, date },
    { ...values, ...customTask, score: calculateScore(values) },
    { new: true, upsert: true, runValidators: true }
  );
  const streak = await updateStreak(req.user._id);
  res.status(201).json({ record, streak });
});

export const updateProgress = asyncHandler(async (req, res) => {
  const existing = await DailyProgress.findOne({ _id: req.params.id, userId: req.user._id });
  if (!existing) return res.status(404).json({ message: "Progress record not found" });
  const values = valuesFrom({ ...existing.toObject(), ...req.body });
  const customTask = customTaskFrom({ ...existing.toObject(), ...req.body });
  Object.assign(existing, values, customTask, { score: calculateScore(values) });
  await existing.save();
  const streak = await updateStreak(req.user._id);
  res.json({ record: existing, streak });
});
