import express from "express";
import { privateRoute } from "../middlewares/privateRoute.js";
import { getMessagesById } from "../controller/messageController.js";

const router = express.Router();

router.get("/:id", privateRoute, getMessagesById);
router.post("/", privateRoute, getMessagesById);
export default router;
