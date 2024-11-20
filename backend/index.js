import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectDB } from "./db/dataBase.js";
import routeSeeder from "./seeder.js";
import { userRouter } from "./routes/userRoute.js";
import { productRoute } from "./routes/product-Route.js";
import { orderRoute } from "./routes/order-Route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // This parses incoming JSON requests
app.use(cookieParser());


// Connect to the database
connectDB();

// Define routes
app.use('/api/seed', routeSeeder);
app.use('/api/user', userRouter);
app.use('/api/product/', productRoute);
app.use('/api/orders', orderRoute);

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
