import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./db/dataBase.js";  // MongoDB connection
import routeSeeder from "./seeder.js";          // Seeder script (for populating the database)
import { userRouter } from "./routes/userRoute.js";  // User routes (signup, login, etc.)
import { productRoute } from "./routes/product-Route.js";  // Product routes
import { orderRoute } from "./routes/order-Route.js";      // Order routes

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to the database
connectDB();

// Define routes
app.use("/api/seed", routeSeeder);
app.use("/api/user", userRouter);
app.use("/api", productRoute);
app.use("/api/orders", orderRoute);

// PayPal configuration route (for handling PayPal client ID)
app.use("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPALCLIENTID);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// Export the app for Vercel
export default app;
