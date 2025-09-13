const express = require("express")
const Location = require("../models/Location")
const auth = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/locations
// @desc    Get all locations with filtering
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      type,
      search,
      sortBy = "name",
      sortOrder = "asc",
      lat,
      lng,
      radius = 10, // km
    } = req.query

    // Build filter object
    const filter = { isActive: true }

    if (type) filter.type = type
    if (search) {
      filter.$text = { $search: search }
    }

    // Geospatial query if coordinates provided
    if (lat && lng) {
      filter["coordinates.latitude"] = {
        $gte: Number.parseFloat(lat) - radius / 111, // Rough conversion
        $lte: Number.parseFloat(lat) + radius / 111,
      }
      filter["coordinates.longitude"] = {
        $gte: Number.parseFloat(lng) - radius / (111 * Math.cos((Number.parseFloat(lat) * Math.PI) / 180)),
        $lte: Number.parseFloat(lng) + radius / (111 * Math.cos((Number.parseFloat(lat) * Math.PI) / 180)),
      }
    }

    // Build sort object
    const sort = {}
    sort[sortBy] = sortOrder === "desc" ? -1 : 1

    // Execute query
    const locations = await Location.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()

    const total = await Location.countDocuments(filter)

    res.json({
      locations,
      pagination: {
        current: Number.parseInt(page),
        pages: Math.ceil(total / limit),
        total,
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    })
  } catch (error) {
    console.error("Get locations error:", error)
    res.status(500).json({
      message: "Failed to get locations",
      error: error.message,
    })
  }
})

// @route   GET /api/locations/:id
// @desc    Get single location by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: "Location not found" })
    }

    // Increment views
    await location.incrementViews()

    res.json({ location })
  } catch (error) {
    console.error("Get location error:", error)
    res.status(500).json({
      message: "Failed to get location",
      error: error.message,
    })
  }
})

// @route   POST /api/locations
// @desc    Create new location
// @access  Private (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" })
    }

    const location = new Location(req.body)
    await location.save()

    res.status(201).json({
      message: "Location created successfully",
      location,
    })
  } catch (error) {
    console.error("Create location error:", error)
    res.status(500).json({
      message: "Failed to create location",
      error: error.message,
    })
  }
})

// @route   PUT /api/locations/:id
// @desc    Update location
// @access  Private (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" })
    }

    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: "Location not found" })
    }

    Object.assign(location, req.body)
    await location.save()

    res.json({
      message: "Location updated successfully",
      location,
    })
  } catch (error) {
    console.error("Update location error:", error)
    res.status(500).json({
      message: "Failed to update location",
      error: error.message,
    })
  }
})

// @route   DELETE /api/locations/:id
// @desc    Delete location
// @access  Private (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" })
    }

    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: "Location not found" })
    }

    // Soft delete
    location.isActive = false
    await location.save()

    res.json({ message: "Location deleted successfully" })
  } catch (error) {
    console.error("Delete location error:", error)
    res.status(500).json({
      message: "Failed to delete location",
      error: error.message,
    })
  }
})

// @route   POST /api/locations/:id/review
// @desc    Add review to location
// @access  Private
router.post("/:id/review", auth, async (req, res) => {
  try {
    const { rating, comment } = req.body

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" })
    }

    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: "Location not found" })
    }

    await location.addReview(req.user._id, rating, comment)

    res.json({
      message: "Review added successfully",
      rating: location.rating,
    })
  } catch (error) {
    console.error("Add review error:", error)
    res.status(400).json({
      message: error.message || "Failed to add review",
    })
  }
})

// @route   POST /api/locations/:id/checkin
// @desc    Check in to location
// @access  Private
router.post("/:id/checkin", auth, async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: "Location not found" })
    }

    await location.incrementCheckins()

    res.json({
      message: "Checked in successfully",
      checkins: location.metadata.checkins,
    })
  } catch (error) {
    console.error("Check in error:", error)
    res.status(500).json({
      message: "Failed to check in",
      error: error.message,
    })
  }
})

// @route   GET /api/locations/search
// @desc    Search locations by name or description
// @access  Public
router.get("/search", async (req, res) => {
  try {
    const { q, type, limit = 10 } = req.query

    if (!q) {
      return res.status(400).json({ message: "Search query is required" })
    }

    const filter = {
      isActive: true,
      $text: { $search: q },
    }

    if (type) filter.type = type

    const locations = await Location.find(filter)
      .select("name description type coordinates address rating")
      .limit(Number.parseInt(limit))
      .lean()

    res.json({
      locations,
      count: locations.length,
    })
  } catch (error) {
    console.error("Search locations error:", error)
    res.status(500).json({
      message: "Failed to search locations",
      error: error.message,
    })
  }
})

// @route   GET /api/locations/types
// @desc    Get all location types with counts
// @access  Public
router.get("/types", async (req, res) => {
  try {
    const types = await Location.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    res.json({ types })
  } catch (error) {
    console.error("Get location types error:", error)
    res.status(500).json({
      message: "Failed to get location types",
      error: error.message,
    })
  }
})

module.exports = router
