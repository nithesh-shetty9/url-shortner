const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is not configured");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected");
  } catch (error) {
    console.error("Failed to connect database:", error.message);
    throw error;
  }
};
module.exports = connectDB;
