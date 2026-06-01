import User from "../models/User.js";
import Streak from "../models/Streak.js";
import WeeklyGoal from "../models/WeeklyGoal.js";
import { DEFAULT_GOALS } from "../utils/defaultGoals.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/token.js";

const responseFor = (user) => ({
  token: signToken(user._id),
  user: { id: user._id, name: user.name, email: user.email, githubUsername: user.githubUsername }
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Name, email, and password are required" });
  if (password.length < 6) return res.status(400).json({ message: "Password must contain at least 6 characters" });
  if (await User.exists({ email: email.toLowerCase() })) return res.status(409).json({ message: "Email is already registered" });

  const user = await User.create({ name, email, password });
  await Promise.all([
    Streak.create({ userId: user._id }),
    WeeklyGoal.insertMany(DEFAULT_GOALS.map((goal) => ({ ...goal, userId: user._id })))
  ]);
  res.status(201).json(responseFor(user));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email?.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password || ""))) return res.status(401).json({ message: "Invalid email or password" });
  res.json(responseFor(user));
});

export const me = asyncHandler(async (req, res) => {
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email, githubUsername: req.user.githubUsername });
});
