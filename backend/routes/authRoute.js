import express from "express";
import {
  createuser,
  loginUser,
  logoutUser,
} from "../controller/authController.js";
const router = express.Router();

router.post("/signup", createuser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
export default router;
