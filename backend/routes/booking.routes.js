import express from "express"
import { bookService, handleBookingRequest, myBookedService, ongoingBooking, updateBooking } from "../controller/booking.controller.js";

const router = express.Router();

//router.post("/addService",addservice);
router.post("/bookService",bookService);
router.get("/myBookedService",myBookedService);
router.get("/ongoingBooking",ongoingBooking);
router.put("/handleBookingRequest",handleBookingRequest);
router.put("/updateBooking",updateBooking);


export default router;