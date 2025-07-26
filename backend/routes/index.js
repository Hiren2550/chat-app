import express from "express";
import authRoutes from "./authRoute.js";
import userRoutes from "./userRoute.js";
import messageRoutes from "./messageRoute.js";
import Response from "../middlewares/Response.js";
const router = express.Router();

router.use("/auth", authRoutes, Response);
router.use("/user", userRoutes, Response);
router.use("/message", messageRoutes, Response);

export default router;
