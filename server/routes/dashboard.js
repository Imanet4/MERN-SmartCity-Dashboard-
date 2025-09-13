const express = require("express")
const { getDashboardStats, getUserActivity } = require("../controllers/dashboardController")
const auth = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Public
router.get("/stats", getDashboardStats)

// @route   GET /api/dashboard/activity
// @desc    Get user activity summary
// @access  Private
router.get("/activity", auth, getUserActivity)

module.exports = router
