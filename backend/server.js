import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import http from 'http';

import adminRoutes from "./routes/admin.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import overviewRoutes from "./routes/overview.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import reviewRoutes from "./routes/review.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import initSocketIO from "./socket.js";

const app = express();
const server = http.createServer(app);
const io = initSocketIO(server);

const PORT = 5001;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',  
    credentials: true,  
}));

app.use("/api/admin",adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reviews", reviewRoutes);

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is running on Port ${PORT}`);
});

export { io }; 
