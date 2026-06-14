const express = require("express");
const {
  createBooking,
  getBookings,
  getBookingById,
  confirmPayment,
  cancelBooking,
  checkInBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.get("/:bookingId", getBookingById);
router.put("/:bookingId/confirm-payment", confirmPayment);
router.put("/:bookingId/cancel", cancelBooking);
router.put("/:bookingId/check-in", checkInBooking);
router.delete("/:bookingId", deleteBooking);

module.exports = router;