import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import v60Routes from "./routes/v60Routes";
import recipeRoutes from "./routes/recipeRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("BloomLab API is running");
});

/**
 * Add your routes here
 */
app.use("/api/auth", authRoutes);
app.use("/api/v60", v60Routes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});