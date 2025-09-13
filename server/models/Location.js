const mongoose = require("mongoose")

const locationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Location name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    type: {
      type: String,
      required: [true, "Location type is required"],
      enum: {
        values: ["tourism", "historical", "shopping", "sports", "government", "healthcare", "education", "transport"],
        message: "Invalid location type",
      },
    },
    coordinates: {
      latitude: {
        type: Number,
        required: [true, "Latitude is required"],
        min: [-90, "Latitude must be between -90 and 90"],
        max: [90, "Latitude must be between -90 and 90"],
      },
      longitude: {
        type: Number,
        required: [true, "Longitude is required"],
        min: [-180, "Longitude must be between -180 and 180"],
        max: [180, "Longitude must be between -180 and 180"],
      },
    },
    address: {
      street: String,
      city: {
        type: String,
        default: "Agadir",
      },
      postalCode: String,
      country: {
        type: String,
        default: "Morocco",
      },
    },
    contact: {
      phone: {
        type: String,
        match: [/^(\+212|0)[5-7][0-9]{8}$/, "Please enter a valid Moroccan phone number"],
      },
      email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
      },
      website: {
        type: String,
        match: [/^https?:\/\/.+/, "Please enter a valid URL"],
      },
    },
    hours: {
      monday: { open: String, close: String },
      tuesday: { open: String, close: String },
      wednesday: { open: String, close: String },
      thursday: { open: String, close: String },
      friday: { open: String, close: String },
      saturday: { open: String, close: String },
      sunday: { open: String, close: String },
    },
    amenities: [
      {
        type: String,
        enum: ["parking", "wifi", "accessibility", "restrooms", "cafe", "gift_shop", "guided_tours"],
      },
    ],
    images: [
      {
        url: String,
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    rating: {
      average: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          maxlength: [500, "Review comment cannot exceed 500 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    metadata: {
      views: {
        type: Number,
        default: 0,
      },
      checkins: {
        type: Number,
        default: 0,
      },
    },
    worldCup2030: {
      isVenue: {
        type: Boolean,
        default: false,
      },
      capacity: Number,
      venueType: {
        type: String,
        enum: ["stadium", "training", "accommodation", "transport", "fan_zone"],
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Indexes for geospatial queries
locationSchema.index({ "coordinates.latitude": 1, "coordinates.longitude": 1 })
locationSchema.index({ type: 1 })
locationSchema.index({ "address.city": 1 })
locationSchema.index({ isActive: 1 })

// Text search index
locationSchema.index({
  name: "text",
  description: "text",
  "address.street": "text",
})

// Methods
locationSchema.methods.addReview = function (userId, rating, comment) {
  // Check if user already reviewed
  const existingReview = this.reviews.find((review) => review.user.toString() === userId.toString())
  if (existingReview) {
    throw new Error("User has already reviewed this location")
  }

  this.reviews.push({ user: userId, rating, comment })
  this.updateRating()
  return this.save()
}

locationSchema.methods.updateRating = function () {
  if (this.reviews.length === 0) {
    this.rating.average = 0
    this.rating.count = 0
    return
  }

  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0)
  this.rating.average = Math.round((totalRating / this.reviews.length) * 10) / 10
  this.rating.count = this.reviews.length
}

locationSchema.methods.incrementViews = function () {
  this.metadata.views += 1
  return this.save()
}

locationSchema.methods.incrementCheckins = function () {
  this.metadata.checkins += 1
  return this.save()
}

module.exports = mongoose.model("Location", locationSchema)
