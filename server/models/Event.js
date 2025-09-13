const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
      validate: {
        validator: (date) => date > new Date(),
        message: "Event date must be in the future",
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator: function (endDate) {
          return !endDate || endDate > this.date
        },
        message: "End date must be after start date",
      },
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    coordinates: {
      latitude: {
        type: Number,
        min: [-90, "Latitude must be between -90 and 90"],
        max: [90, "Latitude must be between -90 and 90"],
      },
      longitude: {
        type: Number,
        min: [-180, "Longitude must be between -180 and 180"],
        max: [180, "Longitude must be between -180 and 180"],
      },
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: {
        values: ["cultural", "technology", "sports", "community", "business", "education"],
        message: "Category must be one of: cultural, technology, sports, community, business, education",
      },
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendees: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        registeredAt: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["registered", "attended", "cancelled"],
          default: "registered",
        },
      },
    ],
    maxAttendees: {
      type: Number,
      min: [1, "Maximum attendees must be at least 1"],
      max: [10000, "Maximum attendees cannot exceed 10,000"],
    },
    price: {
      type: Number,
      min: [0, "Price cannot be negative"],
      default: 0,
    },
    currency: {
      type: String,
      default: "MAD",
      enum: ["MAD", "EUR", "USD"],
    },
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
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "published",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    requiresApproval: {
      type: Boolean,
      default: false,
    },
    contactInfo: {
      email: {
        type: String,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"],
      },
      phone: {
        type: String,
        match: [/^(\+212|0)[5-7][0-9]{8}$/, "Please enter a valid Moroccan phone number"],
      },
      website: {
        type: String,
        match: [/^https?:\/\/.+/, "Please enter a valid URL"],
      },
    },
    metadata: {
      views: {
        type: Number,
        default: 0,
      },
      shares: {
        type: Number,
        default: 0,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
)

// Virtual for attendee count
eventSchema.virtual("attendeeCount").get(function () {
  return this.attendees.filter((attendee) => attendee.status === "registered").length
})

// Virtual for available spots
eventSchema.virtual("availableSpots").get(function () {
  if (!this.maxAttendees) return null
  return this.maxAttendees - this.attendeeCount
})

// Virtual for is full
eventSchema.virtual("isFull").get(function () {
  if (!this.maxAttendees) return false
  return this.attendeeCount >= this.maxAttendees
})

// Indexes for better query performance
eventSchema.index({ date: 1 })
eventSchema.index({ category: 1 })
eventSchema.index({ location: 1 })
eventSchema.index({ organizer: 1 })
eventSchema.index({ status: 1 })
eventSchema.index({ "coordinates.latitude": 1, "coordinates.longitude": 1 })

// Text search index
eventSchema.index({
  title: "text",
  description: "text",
  location: "text",
  tags: "text",
})

// Methods
eventSchema.methods.addAttendee = function (userId) {
  const existingAttendee = this.attendees.find((attendee) => attendee.user.toString() === userId.toString())

  if (existingAttendee) {
    throw new Error("User is already registered for this event")
  }

  if (this.isFull) {
    throw new Error("Event is full")
  }

  this.attendees.push({ user: userId })
  return this.save()
}

eventSchema.methods.removeAttendee = function (userId) {
  this.attendees = this.attendees.filter((attendee) => attendee.user.toString() !== userId.toString())
  return this.save()
}

eventSchema.methods.incrementViews = function () {
  this.metadata.views += 1
  return this.save()
}

module.exports = mongoose.model("Event", eventSchema)
