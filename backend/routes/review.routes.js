import express from "express";
import { addreview, getaverage, getreview } from "../controller/review.controller.js";

const router = express.Router();

router.post("/addreview",addreview);
router.get("/getreview",getreview);
router.get("/getaverage",getaverage);


export default router;