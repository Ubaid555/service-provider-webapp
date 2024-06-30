import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";  
import cors from 'cors'; 
 
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import overviewRoutes from "./routes/overview.routes.js";
import profileRoutes from "./routes/profile.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = 5001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from this origin
    credentials: true,  // Allow cookies to be sent
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
    connectToMongoDB();
});
