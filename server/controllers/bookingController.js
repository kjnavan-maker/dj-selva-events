const Booking = require("../models/Booking");

const generateBookingId = () => {
  return `DJS-${Math.floor(100000 + Math.random() * 900000)}`;
};

// POST /api/bookings
const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      event,
      date,
      venue,
      ticket,
      quantity,
      amount,
      paymentMethod,
      notes,
    } = req.body;

    if (!name || !phone || !email || !event || !date || !venue || !ticket) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    let bookingId = generateBookingId();

    const existingBooking = await Booking.findOne({ bookingId });

    if (existingBooking) {
      bookingId = generateBookingId();
    }

    const booking = await Booking.create({
      bookingId,
      name,
      phone,
      email,
      event,
      date,
      venue,
      ticket,
      quantity: Number(quantity) || 1,
      amount: Number(amount) || 0,
      paymentMethod: paymentMethod || "Cash / Bank Transfer",
      notes: notes || "",
      paymentStatus: "Pending",
      bookingStatus: "Pending",
      entryStatus: "Not Checked-in",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Booking creation failed",
      error: error.message,
    });
  }
};

// GET /api/bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// GET /api/bookings/:bookingId
const getBookingById = async (req, res) => {
  try {
    const bookingId = req.params.bookingId.toUpperCase();

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
};

// PUT /api/bookings/:bookingId/confirm-payment
const confirmPayment = async (req, res) => {
  try {
    const bookingId = req.params.bookingId.toUpperCase();

    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      {
        paymentStatus: "Paid",
        bookingStatus: "Confirmed",
      },
      { returnDocument: "after" }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Payment confirmed successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to confirm payment",
      error: error.message,
    });
  }
};

// PUT /api/bookings/:bookingId/cancel
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId.toUpperCase();

    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      {
        bookingStatus: "Cancelled",
      },
      { returnDocument: "after" }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};

// PUT /api/bookings/:bookingId/check-in
const checkInBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId.toUpperCase();

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "This booking has been cancelled",
      });
    }

    if (booking.paymentStatus !== "Paid") {
      return res.status(400).json({
        success: false,
        message: "Payment pending. Entry not allowed",
      });
    }

    if (booking.bookingStatus !== "Confirmed") {
      return res.status(400).json({
        success: false,
        message: "Booking is not confirmed",
      });
    }

    if (booking.entryStatus === "Checked-in") {
      return res.status(400).json({
        success: false,
        message: "Ticket already checked-in",
      });
    }

    booking.entryStatus = "Checked-in";
    booking.checkedInAt = new Date();

    await booking.save();

    res.json({
      success: true,
      message: "Customer checked-in successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Check-in failed",
      error: error.message,
    });
  }
};

// DELETE /api/bookings/:bookingId
const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId.toUpperCase();

    const booking = await Booking.findOneAndDelete({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete booking",
      error: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  confirmPayment,
  cancelBooking,
  checkInBooking,
  deleteBooking,
};