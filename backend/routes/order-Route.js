import express from "express";
import asyncHandler from "express-async-handler";
import { Order } from "../model/order.model.js";
import { auth } from "../middleware/authentication.js";

export const orderRoute = express.Router();

// Orders route
orderRoute.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      taxPrice,
      shippingPrice,
      totalPrice,
      price,
    } = req.body;

    // Check if orderItems is present and not empty
    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    // Create a new order
    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      taxPrice,
      shippingPrice,
      totalPrice,
      price,
      user: req.user._id,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  })
);

orderRoute.put(
  "/:id/payment",
  auth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Update payment fields
      order.isPaid = true;
      order.paidAt = Date.now();

      order.paymentResult = {
        id: req.body.id || "default-id", // Replace with actual payment ID
        status: req.body.status || "Paid", // Replace with actual payment status
        updated_time: req.body.updated_time || new Date().toISOString(),
        email_address: req.body.email_address,
      };

      // Save the updated order
      const updatedOrder = await order.save();

      // Respond with updated order
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);
