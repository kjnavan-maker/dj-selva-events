const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    galleryId: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "DJ Performance",
      trim: true,
    },

    mediaType: {
      type: String,
      enum: ["Photo", "Video"],
      default: "Photo",
    },

    imageData: {
      type: String,
      default: "",
    },

    videoUrl: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Hidden"],
      default: "Active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);