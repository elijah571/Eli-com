import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        
        const connect = await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit the process if connection fails
    }
};
