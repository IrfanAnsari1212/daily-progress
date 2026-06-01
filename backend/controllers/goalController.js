import WeeklyGoal from "../models/WeeklyGoal.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listGoals = asyncHandler(async (req, res) => {
  res.json(await WeeklyGoal.find({ userId: req.user._id }).sort({ week: 1, category: 1, title: 1 }));
});

export const createGoal = asyncHandler(async (req, res) => {
  const goal = await WeeklyGoal.create({ ...req.body, userId: req.user._id });
  res.status(201).json(goal);
});

export const updateGoal = asyncHandler(async (req, res) => {
  const goal = await WeeklyGoal.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { completed: Boolean(req.body.completed) },
    { new: true, runValidators: true }
  );
  if (!goal) return res.status(404).json({ message: "Goal not found" });
  res.json(goal);
});
