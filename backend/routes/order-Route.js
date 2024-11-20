import express from 'express';
import asyncHandler from 'express-async-handler';
import { Order } from '../model/order.model.js';
import { auth } from '../middleware/authentication.js';

export const orderRoute = express.Router();

// Orders route
orderRoute.post(
  '/',
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
      throw new Error('No order items');
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
// 