import express from "express";
import dotenv from "dotenv";
// Import the database connection function
import { connectDB } from "./db/dataBase.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Define a basic route
app.get("/", (req, res) => {
    res.send("Hello nodejs");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
