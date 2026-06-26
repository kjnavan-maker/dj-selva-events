const express = require("express");
const {
  createGalleryItem,
  getGalleryItems,
  getActiveGalleryItems,
  getGalleryItemById,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");

const router = express.Router();

router.post("/", createGalleryItem);
router.get("/", getGalleryItems);
router.get("/active", getActiveGalleryItems);
router.get("/:galleryId", getGalleryItemById);
router.put("/:galleryId", updateGalleryItem);
router.delete("/:galleryId", deleteGalleryItem);

module.exports = router;