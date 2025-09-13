const express = require("express")
const User = require("../models/User")
const auth = require("../middleware/auth")

const router = express.Router()

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get("/profile", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json({
      user: user.getPublicProfile(),
    })
  } catch (error) {
    console.error("Get profile error:", error)
    res.status(500).json({
      message: "Failed to get profile",
      error: error.message,
    })
  }
})

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put("/profile", auth, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, address, city, bio, preferences } = req.body

    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: "Email is already taken" })
      }
    }

    // Update fields
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    if (phone) user.phone = phone
    if (address) user.address = address
    if (city) user.city = city
    if (bio) user.bio = bio
    if (preferences) {
      user.preferences = { ...user.preferences, ...preferences }
    }

    await user.save()

    res.json({
      message: "Profile updated successfully",
      user: user.getPublicProfile(),
    })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({
      message: "Failed to update profile",
      error: error.message,
    })
  }
})

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get("/stats", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    // In a real app, you would calculate these from related models
    const stats = {
      memberSince: user.createdAt,
      eventsAttended: 12, // This would be calculated from Event model
      communityPoints: 2450, // This would be calculated based on user activity
      loginCount: user.loginCount,
      lastLogin: user.lastLogin,
    }

    res.json({ stats })
  } catch (error) {
    console.error("Get stats error:", error)
    res.status(500).json({
      message: "Failed to get user statistics",
      error: error.message,
    })
  }
})

// @route   POST /api/users/avatar
// @desc    Upload user avatar
// @access  Private
router.post("/avatar", auth, async (req, res) => {
  try {
    // In a real app, you would handle file upload here
    // For now, we'll just return a success message
    res.json({
      message: "Avatar upload feature coming soon",
    })
  } catch (error) {
    console.error("Avatar upload error:", error)
    res.status(500).json({
      message: "Failed to upload avatar",
      error: error.message,
    })
  }
})

// @route   DELETE /api/users/account
// @desc    Delete user account
// @access  Private
router.delete("/account", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Soft delete - deactivate account instead of removing
    user.isActive = false
    await user.save()

    res.json({
      message: "Account deactivated successfully",
    })
  } catch (error) {
    console.error("Delete account error:", error)
    res.status(500).json({
      message: "Failed to delete account",
      error: error.message,
    })
  }
})

module.exports = router
