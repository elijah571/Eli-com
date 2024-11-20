import { User } from "../model/user.model.js";
import express from 'express';
import bcryptjs from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import { auth } from "../middleware/authentication.js";

export const userRouter = express.Router();

// Register user
userRouter.post(
    "/signup",
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists.",
            });
        }

        const hashPassword = await bcryptjs.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashPassword,
        });
        await user.save();

        return res.status(201).json({
            success: true,
            user_id: user._id,
            name: user.name,
            email: user.email,
        });
    })
);

// Login

userRouter.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required.",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        const token = await generateToken(user._id, res);
        

        res.status(200).json({
            success: true,
            message: "User successfully logged in.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                token,
            },
        });
    })
);

// Get user profile
userRouter.get(
    "/profile",
    auth,
    asyncHandler(async (req, res) => {
        const user = await User.findById(req.user.id); 
        if (user) {
            res.status(200).json({
                success: true,
                user_id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
    })
);

// Update User

userRouter.put(
    "/update",
    auth,
    asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        try {
            const user = await User.findById(req.user._id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }

            // Update user fields
            user.name = name || user.name;
            user.email = email || user.email;

            // Hash and update password if provided
            if (password) {
                user.password = await bcryptjs.hash(password, 10);
            }

            const updatedUser = await user.save();

            res.status(200).json({
                success: true,
                message: "User updated successfully.",
                user: {
                    user_id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                },
            });
        } catch (error) {
            console.error("Server Error:", error.message);
            res.status(500).json({
                success: false,
                message: "Server error. Please try again later.",
            });
        }
    })
);