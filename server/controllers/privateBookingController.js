const PrivateBooking = require("../models/PrivateBooking");

const generateRequestId = () => {
  return `PVT-${Math.floor(100000 + Math.random() * 900000)}`;
};

// POST /api/private-bookings
const createPrivateBooking = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      eventType,
      eventDate,
      eventLocation,
      expectedCrowd,
      requiredTime,
      budget,
      message,
    } = req.body;

    if (!fullName || !phone || !email || !eventType || !eventDate || !eventLocation) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    let requestId = generateRequestId();

    const existingRequest = await PrivateBooking.findOne({ requestId });

    if (existingRequest) {
      requestId = generateRequestId();
    }

    const privateBooking = await PrivateBooking.create({
      requestId,
      fullName,
      phone,
      email,
      eventType,
      eventDate,
      eventLocation,
      expectedCrowd: Number(expectedCrowd) || 0,
      requiredTime: requiredTime || "",
      budget: budget || "",
      message: message || "",
      status: "New Request",
    });

    res.status(201).json({
      success: true,
      message: "Private event booking request created successfully",
      privateBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Private event booking request failed",
      error: error.message,
    });
  }
};

// GET /api/private-bookings
const getPrivateBookings = async (req, res) => {
  try {
    const privateBookings = await PrivateBooking.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: privateBookings.length,
      privateBookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch private event bookings",
      error: error.message,
    });
  }
};

// GET /api/private-bookings/:requestId
const getPrivateBookingById = async (req, res) => {
  try {
    const requestId = req.params.requestId.toUpperCase();

    const privateBooking = await PrivateBooking.findOne({ requestId });

    if (!privateBooking) {
      return res.status(404).json({
        success: false,
        message: "Private booking request not found",
      });
    }

    res.json({
      success: true,
      privateBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch private booking request",
      error: error.message,
    });
  }
};

// PUT /api/private-bookings/:requestId/status
const updatePrivateBookingStatus = async (req, res) => {
  try {
    const requestId = req.params.requestId.toUpperCase();
    const { status } = req.body;

    const allowedStatuses = [
      "New Request",
      "Contacted",
      "Confirmed",
      "Rejected",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const privateBooking = await PrivateBooking.findOneAndUpdate(
      { requestId },
      { status },
      { returnDocument: "after" }
    );

    if (!privateBooking) {
      return res.status(404).json({
        success: false,
        message: "Private booking request not found",
      });
    }

    res.json({
      success: true,
      message: "Private booking status updated successfully",
      privateBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update private booking status",
      error: error.message,
    });
  }
};

// DELETE /api/private-bookings/:requestId
const deletePrivateBooking = async (req, res) => {
  try {
    const requestId = req.params.requestId.toUpperCase();

    const privateBooking = await PrivateBooking.findOneAndDelete({ requestId });

    if (!privateBooking) {
      return res.status(404).json({
        success: false,
        message: "Private booking request not found",
      });
    }

    res.json({
      success: true,
      message: "Private booking request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete private booking request",
      error: error.message,
    });
  }
};

module.exports = {
  createPrivateBooking,
  getPrivateBookings,
  getPrivateBookingById,
  updatePrivateBookingStatus,
  deletePrivateBooking,
};