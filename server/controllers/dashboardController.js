const User = require("../models/User")
const Event = require("../models/Event")
const Location = require("../models/Location")

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Public
const getDashboardStats = async (req, res) => {
  try {
    // Get basic counts
    const [userCount, eventCount, locationCount, upcomingEvents] = await Promise.all([
      User.countDocuments({ isActive: true }),
      Event.countDocuments({ status: "published" }),
      Location.countDocuments({ isActive: true }),
      Event.countDocuments({
        status: "published",
        date: { $gte: new Date() },
      }),
    ])

    // Get events by category
    const eventsByCategory = await Event.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Get locations by type
    const locationsByType = await Location.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ])

    // Get recent events
    const recentEvents = await Event.find({
      status: "published",
      date: { $gte: new Date() },
    })
      .sort({ date: 1 })
      .limit(5)
      .populate("organizer", "firstName lastName")
      .lean()

    // Calculate World Cup 2030 readiness
    const worldCupVenues = await Location.countDocuments({
      "worldCup2030.isVenue": true,
      isActive: true,
    })

    const stats = {
      overview: {
        users: userCount,
        events: eventCount,
        locations: locationCount,
        upcomingEvents,
      },
      breakdown: {
        eventsByCategory,
        locationsByType,
      },
      recentEvents,
      worldCup2030: {
        venues: worldCupVenues,
        readinessScore: Math.min(Math.round((worldCupVenues / 5) * 100), 100), // Assuming 5 venues needed
      },
      lastUpdated: new Date().toISOString(),
    }

    res.json({ stats })
  } catch (error) {
    console.error("Get dashboard stats error:", error)
    res.status(500).json({
      message: "Failed to get dashboard statistics",
      error: error.message,
    })
  }
}

// @desc    Get user activity summary
// @route   GET /api/dashboard/activity
// @access  Private
const getUserActivity = async (req, res) => {
  try {
    const userId = req.user._id

    // Get user's events (organized and attending)
    const [organizedEvents, attendingEvents] = await Promise.all([
      Event.find({ organizer: userId }).countDocuments(),
      Event.find({ "attendees.user": userId }).countDocuments(),
    ])

    // Get user's recent activity (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const recentActivity = {
      eventsCreated: await Event.countDocuments({
        organizer: userId,
        createdAt: { $gte: thirtyDaysAgo },
      }),
      eventsJoined: await Event.countDocuments({
        "attendees.user": userId,
        "attendees.registeredAt": { $gte: thirtyDaysAgo },
      }),
    }

    const activity = {
      summary: {
        organizedEvents,
        attendingEvents,
        totalEvents: organizedEvents + attendingEvents,
      },
      recent: recentActivity,
      lastUpdated: new Date().toISOString(),
    }

    res.json({ activity })
  } catch (error) {
    console.error("Get user activity error:", error)
    res.status(500).json({
      message: "Failed to get user activity",
      error: error.message,
    })
  }
}

module.exports = {
  getDashboardStats,
  getUserActivity,
}
