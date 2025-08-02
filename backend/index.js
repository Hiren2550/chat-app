import express from "express";
import dotenv from "dotenv";
import routes from "./routes/index.js";
import { connectDB } from "./lib/DB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./utils/errorHandler.js";
import { app, server } from "./lib/socket.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Frontend URL
    credentials: true,
  })
);
// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// API routes
app.use("/api", routes);

// ✅ Serve frontend static files (React build)
app.use(express.static(path.join(__dirname, "../frontend/dist"))); // For Vite
// OR: use "../frontend/build" if CRA

// ✅ SPA fallback route for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html")); // or build/
});

// Error handling middleware (after routes)
app.use(errorHandler);

// Start server
server.listen(port, async () => {
  await connectDB();
  console.log(`Server is running on port ${port}... 🚀`);
});
