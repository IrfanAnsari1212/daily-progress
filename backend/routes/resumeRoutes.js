import { Router } from "express";
import { getResume, saveResume } from "../controllers/resumeController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);
router.get("/", getResume);
router.put("/", saveResume);
export default router;
