import mongoose from "mongoose";

const booleanFields = {
  dsa1: Boolean, dsa2: Boolean, dsa3: Boolean, dsa4: Boolean, dsa5: Boolean, dsa6: Boolean,
  learning: Boolean, project: Boolean,
  github: Boolean, os: Boolean, dbms: Boolean, cn: Boolean, jobs: Boolean,
  exercise: Boolean, sleep: Boolean, wakeRule: Boolean, sleepRule: Boolean,
  youtubeRule: Boolean, courseRule: Boolean
};

const dailyProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  date: { type: Date, required: true },
  ...booleanFields,
  taskOfDay: { type: String, trim: true, maxlength: 160, default: "" },
  taskOfDayCompleted: { type: Boolean, default: false },
  score: { type: Number, default: 0, min: 0, max: 10 }
}, { timestamps: true });

dailyProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyProgress", dailyProgressSchema);
