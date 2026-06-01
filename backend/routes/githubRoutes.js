import { Router } from "express";
import { githubSummary } from "../controllers/githubController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.get("/:username", protect, githubSummary);
export default router;
