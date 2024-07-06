import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";  
import cors from 'cors'; 

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import messageRoutes from "./routes/message.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import overviewRoutes from "./routes/overview.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import reviewRoutes from "./routes/review.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = 5001;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true
    }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/overview", overviewRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reviews", reviewRoutes);

connectToMongoDB();

io.on("connection", (socket) => {
    console.log("A user connected: " + socket.id);

    socket.on("sendMessage", (message) => {
        io.emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: " + socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});

export { io };
