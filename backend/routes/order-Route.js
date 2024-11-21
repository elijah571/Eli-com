import express from "express";
import asyncHandler from "express-async-handler";
import { Order } from "../model/order.model.js";
import { auth } from "../middleware/authentication.js";

export const orderRoute = express.Router();

// Create Order
orderRoute.post(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items provided");
    }

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user._id,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  })
);

// Mark as Paid
orderRoute.put(
  "/:id/payment",
  auth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
      if (order.isPaid) {
        res.status(400);
        throw new Error("Order is already paid");
      }

      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        updated_time: req.body.updated_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);

// Fetch All Orders
orderRoute.get(
  "/",
  auth,
  asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ _id: -1 });
    if (orders.length > 0) {
      res.status(200).json(orders);
    } else {
      res.status(404);
      throw new Error("No orders found");
    }
  })
);

// Fetch Single Order
orderRoute.get(
  "/:id",
  auth,
  asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404);
      throw new Error("Order not found");
    }
  })
);
