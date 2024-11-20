import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

export const generateToken = asyncHandler(async (id, res) => {
    // Generate the token using user id
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d", // Expiration set to 1 day
    });

    // Set the token in the cookie
    res.cookie('token', token, {
        httpOnly: true, // Prevents JavaScript access to cookie
        secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production (HTTPS)
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        sameSite: 'strict', // Helps prevent CSRF
    });

    return token; // Return token if you need it for other purposes
});
