const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("dotenv").config()

// Import models
const User = require("../models/User")
const Event = require("../models/Event")
const Location = require("../models/Location")

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/smart-city-dashboard")
    console.log("✅ Connected to MongoDB")
  } catch (error) {
    console.error("❌ MongoDB connection error:", error)
    process.exit(1)
  }
}

// Sample users data
const usersData = [
  {
    firstName: "Ahmed",
    lastName: "Benali",
    email: "ahmed.benali@example.com",
    password: "password123",
    phone: "+212661234567",
    city: "Agadir",
    role: "admin",
    bio: "Smart City Administrator for Agadir",
    isEmailVerified: true,
  },
  {
    firstName: "Fatima",
    lastName: "El Mansouri",
    email: "fatima.mansouri@example.com",
    password: "password123",
    phone: "+212662345678",
    city: "Agadir",
    role: "user",
    bio: "Local resident and community organizer",
    isEmailVerified: true,
  },
  {
    firstName: "Youssef",
    lastName: "Alami",
    email: "youssef.alami@example.com",
    password: "password123",
    phone: "+212663456789",
    city: "Agadir",
    role: "moderator",
    bio: "Event coordinator and tourism guide",
    isEmailVerified: true,
  },
]

// Sample locations data for Agadir
const locationsData = [
  {
    name: "Agadir Marina",
    description: "Beautiful marina with restaurants, shops, and boat tours. Perfect for evening walks and dining.",
    type: "tourism",
    coordinates: {
      latitude: 30.4278,
      longitude: -9.5981,
    },
    address: {
      street: "Marina d'Agadir",
      city: "Agadir",
      postalCode: "80000",
      country: "Morocco",
    },
    contact: {
      phone: "+212528844444",
      email: "info@agadir-marina.ma",
      website: "https://agadir-marina.ma",
    },
    hours: {
      monday: { open: "09:00", close: "23:00" },
      tuesday: { open: "09:00", close: "23:00" },
      wednesday: { open: "09:00", close: "23:00" },
      thursday: { open: "09:00", close: "23:00" },
      friday: { open: "09:00", close: "23:00" },
      saturday: { open: "09:00", close: "23:00" },
      sunday: { open: "09:00", close: "23:00" },
    },
    amenities: ["parking", "wifi", "accessibility", "restrooms", "cafe"],
    rating: { average: 4.5, count: 1250 },
    isVerified: true,
  },
  {
    name: "Agadir Beach",
    description: "6km of golden sandy beach perfect for swimming, surfing, and beach sports.",
    type: "tourism",
    coordinates: {
      latitude: 30.4202,
      longitude: -9.5982,
    },
    address: {
      street: "Corniche d'Agadir",
      city: "Agadir",
      postalCode: "80000",
      country: "Morocco",
    },
    amenities: ["parking", "restrooms", "cafe"],
    rating: { average: 4.7, count: 2100 },
    isVerified: true,
  },
  {
    name: "Kasbah of Agadir Oufla",
    description: "Historic fortress ruins offering panoramic views of Agadir and the Atlantic Ocean.",
    type: "historical",
    coordinates: {
      latitude: 30.4347,
      longitude: -9.5981,
    },
    address: {
      street: "Colline d'Agadir Oufla",
      city: "Agadir",
      postalCode: "80000",
      country: "Morocco",
    },
    hours: {
      monday: { open: "08:00", close: "18:00" },
      tuesday: { open: "08:00", close: "18:00" },
      wednesday: { open: "08:00", close: "18:00" },
      thursday: { open: "08:00", close: "18:00" },
      friday: { open: "08:00", close: "18:00" },
      saturday: { open: "08:00", close: "18:00" },
      sunday: { open: "08:00", close: "18:00" },
    },
    amenities: ["parking", "guided_tours"],
    rating: { average: 4.2, count: 890 },
    isVerified: true,
  },
  {
    name: "Souk Al-Had",
    description: "Traditional market with over 6000 shops selling everything from spices to handicrafts.",
    type: "shopping",
    coordinates: {
      latitude: 30.4278,
      longitude: -9.6081,
    },
    address: {
      street: "Avenue du 29 Février",
      city: "Agadir",
      postalCode: "80000",
      country: "Morocco",
    },
    hours: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "18:00" },
      saturday: { open: "09:00", close: "18:00" },
      sunday: { open: "Closed", close: "Closed" },
    },
    amenities: ["parking", "restrooms", "cafe"],
    rating: { average: 4.3, count: 1560 },
    isVerified: true,
  },
  {
    name: "Agadir Stadium",
    description: "Modern football stadium, future venue for FIFA World Cup 2030 matches.",
    type: "sports",
    coordinates: {
      latitude: 30.4178,
      longitude: -9.5881,
    },
    address: {
      street: "Avenue Mohammed V",
      city: "Agadir",
      postalCode: "80000",
      country: "Morocco",
    },
    contact: {
      phone: "+212528333333",
      email: "info@agadir-stadium.ma",
    },
    amenities: ["parking", "wifi", "accessibility", "restrooms", "cafe"],
    worldCup2030: {
      isVenue: true,
      capacity: 45000,
      venueType: "stadium",
    },
    rating: { average: 4.6, count: 750 },
    isVerified: true,
  },
  {
    name: "Agadir City Hall",
    description: "Municipal government center providing public services to residents and visitors.",
    type: "government",
    coordinates: {
      latitude: 30.4278,
      longitude: -9.5781,
    },
    address: {
      street: "Avenue Hassan II",
      city: "Agadir",
      postalCode: "80000",
      country: "Morocco",
    },
    contact: {
      phone: "+212528222222",
      email: "contact@agadir.ma",
      website: "https://agadir.ma",
    },
    hours: {
      monday: { open: "08:00", close: "16:00" },
      tuesday: { open: "08:00", close: "16:00" },
      wednesday: { open: "08:00", close: "16:00" },
      thursday: { open: "08:00", close: "16:00" },
      friday: { open: "08:00", close: "12:00" },
      saturday: { open: "Closed", close: "Closed" },
      sunday: { open: "Closed", close: "Closed" },
    },
    amenities: ["parking", "wifi", "accessibility"],
    isVerified: true,
  },
]

// Sample events data
const eventsData = [
  {
    title: "Agadir Festival of Arts",
    description:
      "Annual celebration of Moroccan arts and culture featuring local artists, traditional music, and contemporary performances.",
    date: new Date("2024-04-15T18:00:00Z"),
    endDate: new Date("2024-04-17T22:00:00Z"),
    location: "Agadir Marina",
    coordinates: {
      latitude: 30.4278,
      longitude: -9.5981,
    },
    category: "cultural",
    maxAttendees: 2000,
    price: 0,
    tags: ["culture", "arts", "music", "traditional", "festival"],
    contactInfo: {
      email: "info@agadir-arts-festival.ma",
      phone: "+212528555555",
    },
  },
  {
    title: "Smart City Tech Conference 2024",
    description:
      "Exploring the future of urban technology and sustainable development in Morocco. Join experts from around the world.",
    date: new Date("2024-04-20T09:00:00Z"),
    endDate: new Date("2024-04-20T17:00:00Z"),
    location: "Agadir Convention Center",
    category: "technology",
    maxAttendees: 500,
    price: 200,
    currency: "MAD",
    tags: ["technology", "smart-city", "sustainability", "innovation"],
    contactInfo: {
      email: "register@smartcity-agadir.ma",
      phone: "+212528666666",
      website: "https://smartcity-agadir.ma",
    },
  },
  {
    title: "International Beach Volleyball Tournament",
    description: "Professional beach volleyball championship on Agadir's beautiful coastline with international teams.",
    date: new Date("2024-04-25T10:00:00Z"),
    endDate: new Date("2024-04-28T18:00:00Z"),
    location: "Agadir Beach",
    coordinates: {
      latitude: 30.4202,
      longitude: -9.5982,
    },
    category: "sports",
    maxAttendees: 5000,
    price: 50,
    currency: "MAD",
    tags: ["sports", "volleyball", "beach", "international", "tournament"],
    contactInfo: {
      email: "info@agadir-volleyball.ma",
      phone: "+212528777777",
    },
  },
  {
    title: "World Cup 2030 Community Meeting",
    description:
      "Community meeting to discuss infrastructure preparations and tourism opportunities for FIFA World Cup 2030.",
    date: new Date("2024-05-05T19:00:00Z"),
    location: "Agadir City Hall",
    category: "community",
    maxAttendees: 200,
    price: 0,
    tags: ["world-cup", "community", "infrastructure", "tourism", "2030"],
    contactInfo: {
      email: "worldcup2030@agadir.ma",
      phone: "+212528222222",
    },
  },
]

// Seed functions
const seedUsers = async () => {
  try {
    await User.deleteMany({})
    console.log("🗑️ Cleared existing users")

    const users = []
    for (const userData of usersData) {
      const salt = await bcrypt.genSalt(12)
      userData.password = await bcrypt.hash(userData.password, salt)
      users.push(userData)
    }

    const createdUsers = await User.insertMany(users)
    console.log(`✅ Created ${createdUsers.length} users`)
    return createdUsers
  } catch (error) {
    console.error("❌ Error seeding users:", error)
    throw error
  }
}

const seedLocations = async () => {
  try {
    await Location.deleteMany({})
    console.log("🗑️ Cleared existing locations")

    const createdLocations = await Location.insertMany(locationsData)
    console.log(`✅ Created ${createdLocations.length} locations`)
    return createdLocations
  } catch (error) {
    console.error("❌ Error seeding locations:", error)
    throw error
  }
}

const seedEvents = async (users) => {
  try {
    await Event.deleteMany({})
    console.log("🗑️ Cleared existing events")

    // Assign random organizers to events
    const eventsWithOrganizers = eventsData.map((event) => ({
      ...event,
      organizer: users[Math.floor(Math.random() * users.length)]._id,
    }))

    const createdEvents = await Event.insertMany(eventsWithOrganizers)
    console.log(`✅ Created ${createdEvents.length} events`)
    return createdEvents
  } catch (error) {
    console.error("❌ Error seeding events:", error)
    throw error
  }
}

// Main seed function
const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...")

    await connectDB()

    const users = await seedUsers()
    const locations = await seedLocations()
    const events = await seedEvents(users)

    console.log("🎉 Database seeding completed successfully!")
    console.log(`📊 Summary:`)
    console.log(`   - Users: ${users.length}`)
    console.log(`   - Locations: ${locations.length}`)
    console.log(`   - Events: ${events.length}`)

    process.exit(0)
  } catch (error) {
    console.error("❌ Database seeding failed:", error)
    process.exit(1)
  }
}

// Run seeding if called directly
if (require.main === module) {
  seedDatabase()
}

module.exports = { seedDatabase, seedUsers, seedLocations, seedEvents }
