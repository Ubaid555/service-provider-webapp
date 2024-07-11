import express from "express";
import { login, signup,logout, verifyOtp, getUser, forgotPassword, resetPassword } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);

router.post('/verify-otp', verifyOtp);

router.post("/login",login);

router.post("/logout",logout);

router.get("/getUser",getUser);

router.get("/forgotPassword",forgotPassword);

router.put("/resetPassword",resetPassword);

export default router;