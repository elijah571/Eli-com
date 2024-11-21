import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const generateToken = asyncHandler(async (id, res) => {
  // Generate the token using user id
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // Set the token in the cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "strict",
  });

  return token;
});
