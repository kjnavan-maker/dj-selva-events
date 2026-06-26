const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// CORS setup
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dj-selva-events-zxty.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Default API route
app.get("/", (req, res) => {
  res.json({
    message: "DJ Selva Events API is running",
  });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend server is healthy",
  });
});

// API Routes
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/private-bookings", require("./routes/privateBookingRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));

// 404 route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});