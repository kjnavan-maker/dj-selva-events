const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use public DNS for MongoDB Atlas SRV lookup
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.log("MongoDB URI missing in .env file");
      return;
    }

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed:", error.message);
    console.log("Server will continue without database connection");
  }
};

module.exports = connectDB;