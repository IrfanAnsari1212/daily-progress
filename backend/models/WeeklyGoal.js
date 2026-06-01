import mongoose from "mongoose";

const weeklyGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  week: { type: Number, required: true, min: 1, max: 3 },
  category: { type: String, required: true },
  title: { type: String, required: true },
  target: { type: Number, default: 1, min: 1 },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

weeklyGoalSchema.index({ userId: 1, week: 1, category: 1, title: 1 }, { unique: true });

export default mongoose.model("WeeklyGoal", weeklyGoalSchema);
