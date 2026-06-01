import DailyProgress from "../models/DailyProgress.js";
import Streak from "../models/Streak.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const analytics = asyncHandler(async (req, res) => {
  const records = await DailyProgress.find({ userId: req.user._id }).sort({ date: 1 }).limit(120).lean();
  const streak = await Streak.findOne({ userId: req.user._id }).lean();
  const daily = records.map((record) => ({
    date: record.date.toISOString().slice(0, 10),
    score: record.score,
    dsa: Number(record.dsa1) + Number(record.dsa2) + Number(record.dsa3),
    jobs: Number(record.jobs),
    streak: record.score >= 8 ? 1 : 0
  }));
  let runningStreak = 0;
  daily.forEach((day) => {
    runningStreak = day.score >= 8 ? runningStreak + 1 : 0;
    day.streak = runningStreak;
  });
  res.json({ daily, streak: streak || { currentStreak: 0, longestStreak: 0 } });
});
