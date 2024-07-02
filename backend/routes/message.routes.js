import express from "express";
import { getMessages, sendMessage } from "../controller/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id",getMessages);
router.post("/send",sendMessage);

export default router