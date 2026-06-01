import "dotenv/config";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";

export const app = express();
app.use(cors({ origin: process.env.CLIENT_URL?.split(",") || true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => res.json({ status: "ok", app: "ProgressForge API" }));
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/resume", resumeRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.name === "JsonWebTokenError" || err.name === "TokenExpiredError" ? 401 : 500;
  res.status(status).json({ message: status === 401 ? "Session expired. Please log in again." : err.message || "Server error" });
});

const port = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  connectDB()
    .then(() => app.listen(port, () => console.log(`ProgressForge API listening on ${port}`)))
    .catch((error) => {
      console.error(`Failed to start API: ${error.message}`);
      process.exit(1);
    });
}
