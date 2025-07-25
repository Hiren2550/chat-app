import express from "express";
import authRoutes from "./authRoute.js";
import userRoutes from "./userRoute.js";
import { privateRoute } from "../middlewares/privateRoute.js";
import Response from "../middlewares/Response.js";
const router = express.Router();

router.use("/auth", authRoutes, Response);
router.use("/user", userRoutes, Response);

export default router;
