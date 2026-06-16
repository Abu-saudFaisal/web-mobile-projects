import express from "express";
import { saveRecipe } from "../controllers/recipeController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", protect, saveRecipe);

export default router;