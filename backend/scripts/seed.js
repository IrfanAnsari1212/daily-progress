import "dotenv/config";
import { connectDB } from "../config/db.js";
import DailyProgress from "../models/DailyProgress.js";
import Streak from "../models/Streak.js";
import User from "../models/User.js";
import WeeklyGoal from "../models/WeeklyGoal.js";
import { DEFAULT_GOALS } from "../utils/defaultGoals.js";
import { calculateScore, normalizeDate } from "../utils/scoring.js";

await connectDB();
const email = "demo@progressforge.dev";
let user = await User.findOne({ email });
if (!user) user = await User.create({ name: "Demo Engineer", email, password: "progress123" });

await Promise.all([DailyProgress.deleteMany({ userId: user._id }), WeeklyGoal.deleteMany({ userId: user._id })]);
await WeeklyGoal.insertMany(DEFAULT_GOALS.map((goal, index) => ({ ...goal, userId: user._id, completed: index < 8 })));

const records = Array.from({ length: 28 }, (_, index) => {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - (27 - index));
  const values = {
    dsa1: true, dsa2: index % 3 !== 0, dsa3: index % 4 !== 0, dsa4: index % 2 === 0,
    dsa5: index % 3 === 0, dsa6: index % 4 === 0, learning: index % 5 !== 0,
    project: index % 3 !== 0, github: index % 2 === 0, os: index % 4 === 0, dbms: index % 4 === 1,
    cn: index % 4 === 2, jobs: index % 3 === 0, exercise: index % 2 === 0, sleep: index % 5 !== 0,
    wakeRule: true, sleepRule: index % 3 !== 0, youtubeRule: true, courseRule: true
  };
  return { ...values, userId: user._id, date: normalizeDate(date), score: calculateScore(values) };
});
await DailyProgress.insertMany(records);

let currentStreak = 0;
for (const record of [...records].reverse()) {
  if (record.score < 8) break;
  currentStreak += 1;
}
let longestStreak = 0;
let running = 0;
for (const record of records) {
  running = record.score >= 8 ? running + 1 : 0;
  longestStreak = Math.max(longestStreak, running);
}
await Streak.findOneAndUpdate({ userId: user._id }, { currentStreak, longestStreak }, { upsert: true });
console.log("Seed complete. Login with demo@progressforge.dev / progress123");
process.exit(0);
