import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  skills: { type: [String], default: [] },
  certifications: { type: [String], default: [] },
  projects: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Resume", resumeSchema);
