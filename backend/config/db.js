
const mongoose = require("mongoose");

// Connect to MongoDB Atlas
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        console.log(
            `MongoDB connected successfully: ${connection.connection.host}`
        );

    } catch (error) {
        console.error("MongoDB connection failed:", error.message);

        process.exit(1);
    }
};

// Export database connection function
module.exports = connectDB;
