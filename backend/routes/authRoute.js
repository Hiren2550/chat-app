import express from "express";
import {
  checkAuth,
  createuser,
  loginUser,
  logoutUser,
} from "../controller/authController.js";
import { privateRoute } from "../middlewares/privateRoute.js";
const router = express.Router();

router.post("/signup", createuser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", privateRoute, checkAuth);
export default router;
