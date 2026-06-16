import type { BrewType, Ratio, V60RecipeResult, ScheduleStep } from "../types/v60";

export function calculateV60Recipe(
  brewType: BrewType,
  coffeeGrams: number,
  ratio: Ratio
): V60RecipeResult {
  const totalWater = coffeeGrams * ratio;

  const ice = brewType === "iced" ? Math.round(totalWater * 0.4) : 0;
  const hotWater =
    brewType === "iced" ? Math.round(totalWater * 0.6) : totalWater;

  const bloomWater = Math.round(coffeeGrams * 2);
  const remainingWater = hotWater - bloomWater;

  let numberOfPours = 3;

  if (hotWater < 250) {
    numberOfPours = 2;
  } else if (hotWater > 350) {
    numberOfPours = 4;
  }

  const schedule = generateSchedule(
    brewType,
    hotWater,
    ice,
    bloomWater,
    numberOfPours
  );

  return {
    brewType,
    coffeeGrams,
    ratio,
    totalWater,
    hotWater,
    ice,
    bloomWater,
    remainingWater,
    numberOfPours,
    schedule,
  };
}

function generateSchedule(
  brewType: BrewType,
  hotWater: number,
  ice: number,
  bloomWater: number,
  numberOfPours: number
): ScheduleStep[] {
  const steps: ScheduleStep[] = [];

  if (brewType === "iced") {
    steps.push({
      time: "Before brewing",
      action: "Add ice to server",
      amount: `${ice}g`,
    });
  }

  steps.push({
    time: "0:00",
    action: "Bloom",
    amount: `${bloomWater}ml`,
  });

  const remainingWater = hotWater - bloomWater;
  const pourAmount = remainingWater / numberOfPours;

  const times = ["0:45", "1:15", "1:45", "2:15"];

  for (let i = 0; i < numberOfPours; i++) {
    const cumulativeAmount = Math.round(bloomWater + pourAmount * (i + 1));

    steps.push({
      time: times[i],
      action: i === numberOfPours - 1 ? "Final pour" : `Pour ${i + 1}`,
      amount: `${cumulativeAmount}ml`,
    });
  }

  return steps;
}