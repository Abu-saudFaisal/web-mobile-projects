import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    brewType: {
      type: String,
      enum: ["hot", "iced"],
      required: true,
    },

    coffeeGrams: {
      type: Number,
      required: true,
    },

    ratio: {
      type: Number,
      required: true,
    },

    totalWater: Number,
    hotWater: Number,
    ice: Number,
    bloomWater: Number,
    remainingWater: Number,
    numberOfPours: Number,

    schedule: [
      {
        time: String,
        action: String,
        amount: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);