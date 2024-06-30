import express from "express";
import { overviewAllServices, overviewUserServices } from "../controller/overview.controller.js";

const router = express.Router();

router.get("/overviewAllServices",overviewAllServices);
router.get("/overviewUserServices",overviewUserServices);

export default router;