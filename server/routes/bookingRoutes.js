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

router.put("/:bookingId/confirm", confirmPayment);
router.put("/:bookingId/confirm-payment", confirmPayment);
router.put("/:bookingId/cancel", cancelBooking);
router.put("/:bookingId/check-in", checkInBooking);

router.get("/:bookingId", getBookingById);
router.delete("/:bookingId", deleteBooking);

module.exports = router;