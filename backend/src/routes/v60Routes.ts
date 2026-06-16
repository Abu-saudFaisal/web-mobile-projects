import express from "express";
import { calculateV60 } from "../controllers/v60Controller";

const router = express.Router();

router.post("/calculate", calculateV60);

export default router;