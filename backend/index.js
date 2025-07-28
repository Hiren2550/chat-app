import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { connectDB } from "./lib/DB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";
import { app, server } from "./lib/socket.js";
dotenv.config();

const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend URL (Vite default)
    credentials: true, // If you use cookies/auth
  })
);

// === Log each incoming request ===
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API endpoints
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}... ��`);
});
