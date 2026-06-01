import { Router } from "express";
import { createGoal, listGoals, updateGoal } from "../controllers/goalController.js";
import { protect } from "../middleware/auth.js";

const router = Router();
router.use(protect);
router.get("/", listGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
export default router;
