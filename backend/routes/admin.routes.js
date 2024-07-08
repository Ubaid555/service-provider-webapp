import  express from "express";
import { getAllBookings, getAllServices, getAllUser, setService } from "../controller/admin.controller.js";


const router = express.Router();

router.post("/setService",setService);

router.get("/getAllUsers",getAllUser);

router.get("/getAllServices",getAllServices);

router.get("/getAllBookings",getAllBookings);

export default router;