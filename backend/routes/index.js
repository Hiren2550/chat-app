import express from "express";
import authRoutes from "./authRoute.js";
import userRoutes from "./userRoute.js";
import { privateRoute } from "../middlewares/privateRoute.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
