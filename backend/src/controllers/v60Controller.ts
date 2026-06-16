import { Request, Response } from "express";
import { calculateV60Recipe } from "../utils/v60Calculator";
import type { BrewType, Ratio } from "../types/v60";

export function calculateV60(req: Request, res: Response) {
  const { brewType, coffeeGrams, ratio } = req.body;

  const validBrewTypes: BrewType[] = ["hot", "iced"];
  const validRatios: Ratio[] = [14, 15, 16, 17];

  if (!validBrewTypes.includes(brewType)) {
    return res.status(400).json({ message: "Invalid brew type" });
  }

  if (!validRatios.includes(Number(ratio) as Ratio)) {
    return res.status(400).json({ message: "Invalid ratio" });
  }

  if (!coffeeGrams || Number(coffeeGrams) <= 0) {
    return res.status(400).json({ message: "Coffee grams must be greater than 0" });
  }

  const recipe = calculateV60Recipe(
    brewType,
    Number(coffeeGrams),
    Number(ratio) as Ratio
  );

  return res.status(200).json({ recipe });
}