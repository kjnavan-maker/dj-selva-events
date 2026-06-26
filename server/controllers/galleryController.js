const Gallery = require("../models/Gallery");

const generateGalleryId = () => {
  return `GAL-${Math.floor(100000 + Math.random() * 900000)}`;
};

// POST /api/gallery
const createGalleryItem = async (req, res) => {
  try {
    const {
      title,
      category,
      mediaType,
      imageData,
      videoUrl,
      description,
      status,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (mediaType === "Photo" && !imageData) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image for photo gallery item",
      });
    }

    if (mediaType === "Video" && !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Please enter video URL for video gallery item",
      });
    }

    let galleryId = generateGalleryId();

    const existingGallery = await Gallery.findOne({ galleryId });

    if (existingGallery) {
      galleryId = generateGalleryId();
    }

    const galleryItem = await Gallery.create({
      galleryId,
      title,
      category: category || "DJ Performance",
      mediaType: mediaType || "Photo",
      imageData: imageData || "",
      videoUrl: videoUrl || "",
      description: description || "",
      status: status || "Active",
    });

    res.status(201).json({
      success: true,
      message: "Gallery item created successfully",
      galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gallery item creation failed",
      error: error.message,
    });
  }
};

// GET /api/gallery
const getGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: galleryItems.length,
      galleryItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery items",
      error: error.message,
    });
  }
};

// GET /api/gallery/active
const getActiveGalleryItems = async (req, res) => {
  try {
    const galleryItems = await Gallery.find({ status: "Active" }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: galleryItems.length,
      galleryItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch active gallery items",
      error: error.message,
    });
  }
};

// GET /api/gallery/:galleryId
const getGalleryItemById = async (req, res) => {
  try {
    const galleryId = req.params.galleryId.toUpperCase();

    const galleryItem = await Gallery.findOne({ galleryId });

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery item",
      error: error.message,
    });
  }
};

// PUT /api/gallery/:galleryId
const updateGalleryItem = async (req, res) => {
  try {
    const galleryId = req.params.galleryId.toUpperCase();

    const {
      title,
      category,
      mediaType,
      imageData,
      videoUrl,
      description,
      status,
    } = req.body;

    const galleryItem = await Gallery.findOne({ galleryId });

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    if (mediaType === "Photo" && !imageData) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image for photo gallery item",
      });
    }

    if (mediaType === "Video" && !videoUrl) {
      return res.status(400).json({
        success: false,
        message: "Please enter video URL for video gallery item",
      });
    }

    galleryItem.title = title || galleryItem.title;
    galleryItem.category = category || "DJ Performance";
    galleryItem.mediaType = mediaType || "Photo";
    galleryItem.imageData = imageData || "";
    galleryItem.videoUrl = videoUrl || "";
    galleryItem.description = description || "";
    galleryItem.status = status || "Active";

    await galleryItem.save();

    res.json({
      success: true,
      message: "Gallery item updated successfully",
      galleryItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gallery item update failed",
      error: error.message,
    });
  }
};

// DELETE /api/gallery/:galleryId
const deleteGalleryItem = async (req, res) => {
  try {
    const galleryId = req.params.galleryId.toUpperCase();

    const galleryItem = await Gallery.findOneAndDelete({ galleryId });

    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gallery item delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  createGalleryItem,
  getGalleryItems,
  getActiveGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem,
};