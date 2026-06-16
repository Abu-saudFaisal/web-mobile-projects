export type BrewType = "hot" | "iced";
export type Ratio = 14 | 15 | 16 | 17;

export type ScheduleStep = {
  time: string;
  action: string;
  amount: string;
};

export type V60RecipeResult = {
  brewType: BrewType;
  coffeeGrams: number;
  ratio: Ratio;
  totalWater: number;
  hotWater: number;
  ice: number;
  bloomWater: number;
  remainingWater: number;
  numberOfPours: number;
  schedule: ScheduleStep[];
};