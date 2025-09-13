const express = require("express")
const Event = require("../models/Event")
const auth = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/events
// @desc    Get all events with filtering and pagination
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      city,
      startDate,
      endDate,
      search,
      sortBy = "date",
      sortOrder = "asc",
    } = req.query

    // Build filter object
    const filter = { status: "published", isPublic: true }

    if (category) filter.category = category
    if (city) filter.location = new RegExp(city, "i")
    if (startDate || endDate) {
      filter.date = {}
      if (startDate) filter.date.$gte = new Date(startDate)
      if (endDate) filter.date.$lte = new Date(endDate)
    }

    // Text search
    if (search) {
      filter.$text = { $search: search }
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    // Execute query with pagination
    const events = await Event.find(filter)
      .populate("organizer", "firstName lastName email")
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()

    // Get total count for pagination
    const total = await Event.countDocuments(filter)

    res.json({
      events,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get events error:", error)
    res.status(500).json({
      message: "Failed to get events",
      error: error.message,
    })
  }
})

// @route   GET /api/events/:id
// @desc    Get single event by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "firstName lastName email")
      .populate("attendees.user", "firstName lastName")

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Increment views
    await event.incrementViews()

    res.json({ event })
  } catch (error) {
    console.error("Get event error:", error)
    res.status(500).json({
      message: "Failed to get event",
      error: error.message,
    })
  }
})

// @route   POST /api/events
// @desc    Create new event
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const eventData = {
      ...req.body,
      organizer: req.user._id,
    }

    const event = new Event(eventData)
    await event.save()

    await event.populate("organizer", "firstName lastName email")

    res.status(201).json({
      message: "Event created successfully",
      event,
    })
  } catch (error) {
    console.error("Create event error:", error)
    res.status(500).json({
      message: "Failed to create event",
      error: error.message,
    })
  }
})

// @route   PUT /api/events/:id
// @desc    Update event
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to update this event" })
    }

    Object.assign(event, req.body)
    await event.save()

    await event.populate("organizer", "firstName lastName email")

    res.json({
      message: "Event updated successfully",
      event,
    })
  } catch (error) {
    console.error("Update event error:", error)
    res.status(500).json({
      message: "Failed to update event",
      error: error.message,
    })
  }
})

// @route   DELETE /api/events/:id
// @desc    Delete event
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Check if user is the organizer or admin
    if (event.organizer.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this event" })
    }

    await Event.findByIdAndDelete(req.params.id)

    res.json({ message: "Event deleted successfully" })
  } catch (error) {
    console.error("Delete event error:", error)
    res.status(500).json({
      message: "Failed to delete event",
      error: error.message,
    })
  }
})

// @route   POST /api/events/:id/join
// @desc    Join an event
// @access  Private
router.post("/:id/join", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    await event.addAttendee(req.user._id)

    res.json({
      message: "Successfully joined the event",
      attendeeCount: event.attendeeCount,
    })
  } catch (error) {
    console.error("Join event error:", error)
    res.status(400).json({
      message: error.message || "Failed to join event",
    })
  }
})

// @route   POST /api/events/:id/leave
// @desc    Leave an event
// @access  Private
router.post("/:id/leave", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    await event.removeAttendee(req.user._id)

    res.json({
      message: "Successfully left the event",
      attendeeCount: event.attendeeCount,
    })
  } catch (error) {
    console.error("Leave event error:", error)
    res.status(500).json({
      message: "Failed to leave event",
      error: error.message,
    })
  }
})

module.exports = router
