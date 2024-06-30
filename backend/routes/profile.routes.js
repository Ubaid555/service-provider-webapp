import express from "express";
import { showProfile, updatePassword } from "../controller/profile.controller.js";

const router = express.Router();

router.get("/showProfile",showProfile);

router.put("/updatePassword",updatePassword); 

export default router; 