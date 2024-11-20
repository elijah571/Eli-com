import express from 'express';
import asyncHandler from "express-async-handler";
import { Product } from '../model/product.model.js';

export const productRoute = express.Router();

// Get all products
productRoute.get("/products", asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}); 
        if (products.length > 0) {  
            res.status(200).json({  
                success: true,
                products,
            });
        } else {
            res.status(404).json({  
                success: false,
                message: "Products not found",
            });
        }
    } catch (error) {
        console.error(error.message);  
        res.status(500).json({ 
            success: false,
            message: "Server error",
        });
    }
}));

// Get a product by ID
productRoute.get("/product/:id", asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); 
        if (product) {
            res.status(200).json({  
                success: true,
                product,
            });
        } else {
            res.status(404).json({ 
                success: false,
                message: "Product not found",
            });
        }
    } catch (error) {
        console.error(error.message);  
        res.status(500).json({ 
            success: false,
            message: "Server error",
        });
    }
}));
