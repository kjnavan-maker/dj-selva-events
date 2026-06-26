const mongoose = require("mongoose");

const privateBookingSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventLocation: {
      type: String,
      required: true,
    },
    expectedCrowd: {
      type: Number,
      default: 0,
    },
    requiredTime: {
      type: String,
      default: "",
    },
    budget: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["New Request", "Contacted", "Confirmed", "Rejected", "Completed"],
      default: "New Request",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PrivateBooking", privateBookingSchema);