import { users } from './data/user.js';
import { User } from './model/user.model.js';
import { products } from './data/products.js';
import { Product } from './model/product.model.js';
import express from 'express';

const router = express.Router();

// Seed user data
router.post('/user', async (req, res) => {
    try {
        await User.deleteMany({});
        const seedUser = await User.insertMany(users);
        res.status(201).send(seedUser);
    } catch (error) {
        res.status(500).send({ message: 'Error seeding users', error });
    }
});

// Seed product data
router.post('/products', async (req, res) => {
    try {
        await Product.deleteMany({});
        const productSeeder = await Product.insertMany(products);
        res.status(201).send(productSeeder);
    } catch (error) {
        res.status(500).send({ message: 'Error seeding products', error });
    }
});

export default router;
