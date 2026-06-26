const Event = require("../models/Event");
const mongoose = require("mongoose");

const generateEventId = () => {
  return `EVT-${Math.floor(100000 + Math.random() * 900000)}`;
};

// POST /api/events
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDate,
      eventTime,
      venue,
      city,
      capacity,
      eventImage,
      normalPrice,
      vipPrice,
      couplePrice,
      backstagePrice,
      description,
      status,
    } = req.body;

    if (!eventName || !eventDate || !eventTime || !venue) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    let eventId = generateEventId();

    const existingEvent = await Event.findOne({ eventId });

    if (existingEvent) {
      eventId = generateEventId();
    }

    const event = await Event.create({
      eventId,
      eventName,
      eventDate,
      eventTime,
      venue,
      city: city || "",
      capacity: Number(capacity) || 150,
      eventImage: eventImage || "",
      normalPrice: Number(normalPrice) || 2500,
      vipPrice: Number(vipPrice) || 5000,
      couplePrice: Number(couplePrice) || 7000,
      backstagePrice: Number(backstagePrice) || 12000,
      description: description || "",
      status: status || "Upcoming",
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Event creation failed",
      error: error.message,
    });
  }
};

// GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

// GET /api/events/:eventId
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const searchConditions = [{ eventId: eventId.toUpperCase() }];

    if (mongoose.Types.ObjectId.isValid(eventId)) {
      searchConditions.push({ _id: eventId });
    }

    const event = await Event.findOne({
      $or: searchConditions,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

// PUT /api/events/:eventId
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const {
      eventName,
      eventDate,
      eventTime,
      venue,
      city,
      capacity,
      eventImage,
      normalPrice,
      vipPrice,
      couplePrice,
      backstagePrice,
      description,
      status,
    } = req.body;

    const searchConditions = [{ eventId: eventId.toUpperCase() }];

    if (mongoose.Types.ObjectId.isValid(eventId)) {
      searchConditions.push({ _id: eventId });
    }

    const event = await Event.findOne({
      $or: searchConditions,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    event.eventName = eventName || event.eventName;
    event.eventDate = eventDate || event.eventDate;
    event.eventTime = eventTime || event.eventTime;
    event.venue = venue || event.venue;
    event.city = city || "";
    event.capacity = Number(capacity) || 150;
    event.eventImage = eventImage || "";
    event.normalPrice = Number(normalPrice) || 2500;
    event.vipPrice = Number(vipPrice) || 5000;
    event.couplePrice = Number(couplePrice) || 7000;
    event.backstagePrice = Number(backstagePrice) || 12000;
    event.description = description || "";
    event.status = status || "Upcoming";

    await event.save();

    res.json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Event update failed",
      error: error.message,
    });
  }
};

// DELETE /api/events/:eventId
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId;

    const searchConditions = [{ eventId: eventId.toUpperCase() }];

    if (mongoose.Types.ObjectId.isValid(eventId)) {
      searchConditions.push({ _id: eventId });
    }

    const event = await Event.findOneAndDelete({
      $or: searchConditions,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Event delete failed",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};