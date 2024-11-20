import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
});

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 }, // Renamed 'numberReview' to 'numReviews' for clarity
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
        reviews: [reviewSchema] // This is correct
    },
    { timestamps: true } // Ensures createdAt and updatedAt fields
);

export const Product = mongoose.model("Product", productSchema);
