const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
      unique: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      default: "",
    },
    capacity: {
      type: Number,
      required: true,
      default: 150,
    },
    normalPrice: {
      type: Number,
      default: 2500,
    },
    vipPrice: {
      type: Number,
      default: 5000,
    },
    couplePrice: {
      type: Number,
      default: 7000,
    },
    backstagePrice: {
      type: Number,
      default: 12000,
    },
    description: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Upcoming", "Active", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);