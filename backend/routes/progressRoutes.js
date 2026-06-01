import { Router } from "express";
import { createProgress, listProgress, updateProgress } from "../controllers/progressController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);
router.get("/", listProgress);
router.post("/", createProgress);
router.put("/:id", updateProgress);
export default router;
