import express from "express";
import { getAllUsers, updateUser } from "../controller/userController.js";
import { privateRoute } from "../middlewares/privateRoute.js";

const router = express.Router();

router.get("/", privateRoute, getAllUsers);
router.post("/update", privateRoute, updateUser);
export default router;
