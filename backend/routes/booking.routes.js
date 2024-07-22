import express from "express"
import { bookService, handleBookingRequest, handleUserRequest, myBookedService, ongoingBooking, success, updateBooking } from "../controller/booking.controller.js";

const router = express.Router();

router.post("/bookService",bookService);
router.get("/success",success);
router.get("/myBookedService",myBookedService);
router.get("/ongoingBooking",ongoingBooking);
router.put("/handleBookingRequest",handleBookingRequest);
router.put("/handleUserRequest",handleUserRequest);
router.put("/updateBooking",updateBooking);


export default router;