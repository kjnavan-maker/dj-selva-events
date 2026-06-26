const express = require("express");
const {
  createPrivateBooking,
  getPrivateBookings,
  getPrivateBookingById,
  updatePrivateBookingStatus,
  deletePrivateBooking,
} = require("../controllers/privateBookingController");

const router = express.Router();

router.post("/", createPrivateBooking);
router.get("/", getPrivateBookings);
router.get("/:requestId", getPrivateBookingById);
router.put("/:requestId/status", updatePrivateBookingStatus);
router.delete("/:requestId", deletePrivateBooking);

module.exports = router;