const express = require("express")

const router = express.Router()

// Mock weather data for Agadir
const mockWeatherData = {
  current: {
    temperature: 24,
    condition: "Sunny",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    icon: "☀️",
    location: "Agadir, Morocco",
    coordinates: {
      latitude: 30.4278,
      longitude: -9.5981,
    },
    lastUpdated: new Date().toISOString(),
  },
  forecast: [
    {
      date: new Date().toISOString().split("T")[0],
      day: "Today",
      high: 26,
      low: 18,
      condition: "Sunny",
      icon: "☀️",
      humidity: 65,
      windSpeed: 12,
      chanceOfRain: 0,
    },
    {
      date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
      day: "Tomorrow",
      high: 28,
      low: 20,
      condition: "Partly Cloudy",
      icon: "⛅",
      humidity: 70,
      windSpeed: 15,
      chanceOfRain: 10,
    },
    {
      date: new Date(Date.now() + 172800000).toISOString().split("T")[0],
      day: "Thursday",
      high: 25,
      low: 17,
      condition: "Cloudy",
      icon: "☁️",
      humidity: 75,
      windSpeed: 18,
      chanceOfRain: 30,
    },
    {
      date: new Date(Date.now() + 259200000).toISOString().split("T")[0],
      day: "Friday",
      high: 23,
      low: 16,
      condition: "Light Rain",
      icon: "🌦️",
      humidity: 80,
      windSpeed: 20,
      chanceOfRain: 70,
    },
    {
      date: new Date(Date.now() + 345600000).toISOString().split("T")[0],
      day: "Saturday",
      high: 27,
      low: 19,
      condition: "Sunny",
      icon: "☀️",
      humidity: 60,
      windSpeed: 10,
      chanceOfRain: 0,
    },
  ],
  alerts: [],
}

// @route   GET /api/weather/current
// @desc    Get current weather for Agadir
// @access  Public
router.get("/current", async (req, res) => {
  try {
    // In a real app, you would fetch from a weather API like OpenWeatherMap
    // For now, we'll return mock data with some randomization
    const current = {
      ...mockWeatherData.current,
      temperature: mockWeatherData.current.temperature + Math.floor(Math.random() * 6) - 3,
      humidity: mockWeatherData.current.humidity + Math.floor(Math.random() * 20) - 10,
      windSpeed: mockWeatherData.current.windSpeed + Math.floor(Math.random() * 10) - 5,
      lastUpdated: new Date().toISOString(),
    }

    res.json({
      current,
      success: true,
    })
  } catch (error) {
    console.error("Get current weather error:", error)
    res.status(500).json({
      message: "Failed to get current weather",
      error: error.message,
    })
  }
})

// @route   GET /api/weather/forecast
// @desc    Get weather forecast
// @access  Public
router.get("/forecast", async (req, res) => {
  try {
    const { days = 5 } = req.query

    // Limit forecast days
    const forecastDays = Math.min(Number.parseInt(days), 7)
    const forecast = mockWeatherData.forecast.slice(0, forecastDays)

    res.json({
      forecast,
      location: mockWeatherData.current.location,
      success: true,
    })
  } catch (error) {
    console.error("Get forecast error:", error)
    res.status(500).json({
      message: "Failed to get weather forecast",
      error: error.message,
    })
  }
})

// @route   GET /api/weather/alerts
// @desc    Get weather alerts
// @access  Public
router.get("/alerts", async (req, res) => {
  try {
    // Mock weather alerts
    const alerts = [
      // Uncomment to test alerts
      // {
      //   id: 1,
      //   type: 'warning',
      //   title: 'High Wind Warning',
      //   description: 'Strong winds expected this afternoon with gusts up to 50 km/h',
      //   severity: 'moderate',
      //   startTime: new Date().toISOString(),
      //   endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
      //   areas: ['Agadir', 'Surrounding areas']
      // }
    ]

    res.json({
      alerts,
      count: alerts.length,
      success: true,
    })
  } catch (error) {
    console.error("Get weather alerts error:", error)
    res.status(500).json({
      message: "Failed to get weather alerts",
      error: error.message,
    })
  }
})

// @route   GET /api/weather/historical
// @desc    Get historical weather data
// @access  Public
router.get("/historical", async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    // Mock historical data
    const historical = {
      period: {
        start: startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        end: endDate || new Date().toISOString().split("T")[0],
      },
      averages: {
        temperature: 23,
        humidity: 68,
        windSpeed: 14,
        rainfall: 2.5,
      },
      extremes: {
        maxTemp: 32,
        minTemp: 12,
        maxWind: 45,
        totalRainfall: 15.2,
      },
    }

    res.json({
      historical,
      success: true,
    })
  } catch (error) {
    console.error("Get historical weather error:", error)
    res.status(500).json({
      message: "Failed to get historical weather data",
      error: error.message,
    })
  }
})

module.exports = router
