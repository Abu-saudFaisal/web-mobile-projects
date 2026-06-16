import { Request, Response } from "express";
import Recipe from "../models/Recipe";

export async function saveRecipe(req: Request, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const recipe = await Recipe.create({
      user: req.user._id,
      ...req.body,
    });

    return res.status(201).json({
      message: "Recipe saved successfully",
      recipe,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to save recipe",
    });
  }
}