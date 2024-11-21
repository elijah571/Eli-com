import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { User } from "../model/user.model.js";

export const auth = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in cookies
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  // no token is found, return an error
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided.",
    });
  }

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message); // Log the error for debugging

    return res.status(401).json({
      success: false,
      message: "Not authorized, token verification failed.",
    });
  }
});
