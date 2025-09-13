"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { weatherAPI } from "../services/api"
import axios from "axios"
import { useTheme } from "../context/ThemeContext"

const Dashboard = () => {
  const { t } = useTranslation()
  const { isDarkMode } = useTheme()
  const [stats, setStats] = useState({
    temperature: "Loading...",
    events: 0,
    alerts: 0,
    population: "421,844",
  })
  const [loading, setLoading] = useState(true)
  const [daysUntilWC, setDaysUntilWC] = useState(0)

  useEffect(() => {
    // Calculate days until World Cup 2030 (June 8, 2030)
    const calculateDaysUntilWC = () => {
      const now = new Date()
      const wcDate = new Date(2030, 5, 8) // June 8, 2030
      const diffTime = wcDate - now
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysUntilWC(diffDays)
    }

    calculateDaysUntilWC()

    const fetchDashboardData = async () => {
      try {
        setLoading(true)

        // Fetch dashboard stats
        const dashboardResponse = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/stats`)
        const weatherResponse = await weatherAPI.getCurrentWeather()

        setStats({
          temperature: `${weatherResponse.data.current.temperature}°C`,
          events: dashboardResponse.data.stats.overview.upcomingEvents,
          alerts: 0, // Weather alerts would come from weather API
          population: "421,844", // Static for now
        })
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
        // Fallback to default values
        setStats({
          temperature: "24°C",
          events: 5,
          alerts: 0,
          population: "421,844",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: isDarkMode 
          ? "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)" 
          : "linear-gradient(135deg, #e6f2f2 0%, #f9f1f4 100%)",
      }}>
        <div className="text-center">
          <div className="spinner-border mb-3" style={{color: "var(--deep-teal)"}} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 style={{color: isDarkMode ? "var(--text-primary)" : "inherit"}}>Loading Dashboard...</h5>
        </div>
      </div>
    )
  }

  // Custom SVG Icons
  const TemperatureIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
    </svg>
  )

  const EventsIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  )

  const AlertIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  )

  const PopulationIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )

  const WeatherIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
    </svg>
  )

  const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  )

  const MapIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  )

  return (
    <div className="min-vh-100 py-5" style={{
      background: isDarkMode 
        ? "var(--bg-primary)" 
        : "linear-gradient(135deg, #e6f2f2 0%, #f9f1f4 100%)",
      color: isDarkMode ? "var(--text-primary)" : "inherit",
      transition: "all 0.3s ease"
    }}>
      <Container>
        {/* Hero Section */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <div className="fade-in">
              <h1 className="display-4 fw-bold mb-3" style={{ color: "var(--deep-teal)" }}>
                {t("dashboard.welcome")}
              </h1>
              <p className="lead mb-4" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                {t("dashboard.subtitle")}
              </p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <Button 
                  as={Link} 
                  to="/weather" 
                  className="rounded-3 px-4 py-2 fw-medium border-0"
                  style={{
                    background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                    color: "white",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <WeatherIcon className="me-2" />
                  {t("nav.weather")}
                </Button>
                <Button 
                  as={Link} 
                  to="/events" 
                  className="rounded-3 px-4 py-2 fw-medium border-0"
                  style={{
                    background: "rgba(122, 47, 71, 0.1)",
                    color: "var(--burgundy)",
                    border: "1px solid var(--burgundy)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--burgundy)";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(122, 47, 71, 0.1)";
                    e.target.style.color = "var(--burgundy)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <CalendarIcon className="me-2" />
                  {t("nav.events")}
                </Button>
                <Button 
                  as={Link} 
                  to="/map" 
                  className="rounded-3 px-4 py-2 fw-medium"
                  style={{
                    background: "transparent",
                    color: "var(--deep-teal)",
                    border: "1px solid var(--deep-teal)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--deep-teal)";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "var(--deep-teal)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <MapIcon className="me-2" />
                  {t("nav.map")}
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="mb-5">
          <Col md={6} lg={3} className="mb-4">
            <Card className="card-custom h-100 slide-in-left border-0">
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ color: "var(--deep-teal)" }}>
                  <TemperatureIcon />
                </div>
                <h3 className="fw-bold mb-2" style={{ color: "var(--deep-teal)" }}>
                  {stats.temperature}
                </h3>
                <p className="mb-0" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  {t("weather.current")}
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="card-custom h-100 slide-in-left border-0" style={{ animationDelay: "0.1s" }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ color: "var(--burgundy)" }}>
                  <EventsIcon />
                </div>
                <h3 className="fw-bold mb-2" style={{ color: "var(--burgundy)" }}>
                  {stats.events}
                </h3>
                <p className="mb-0" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  {t("events.upcoming")}
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="card-custom h-100 slide-in-left border-0" style={{ animationDelay: "0.2s" }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ color: stats.alerts > 0 ? "var(--danger)" : "var(--success)" }}>
                  <AlertIcon />
                </div>
                <h3 className="fw-bold mb-2" style={{ color: stats.alerts > 0 ? "var(--danger)" : "var(--success)" }}>
                  {stats.alerts}
                </h3>
                <p className="mb-0" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  Active Alerts
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={3} className="mb-4">
            <Card className="card-custom h-100 slide-in-left border-0" style={{ animationDelay: "0.3s" }}>
              <Card.Body className="text-center p-4">
                <div className="mb-3" style={{ color: "var(--gold)" }}>
                  <PopulationIcon />
                </div>
                <h3 className="fw-bold mb-2" style={{ color: "var(--gold)" }}>
                  {stats.population}
                </h3>
                <p className="mb-0" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  Population
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Feature Cards */}
        <Row>
          <Col lg={4} className="mb-4">
            <Card className="card-custom h-100 border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ color: "var(--deep-teal)" }}>
                    <WeatherIcon />
                  </div>
                  <h5 className="mb-0" style={{ color: "var(--text-primary)" }}>Weather Monitoring</h5>
                </div>
                <p className="mb-4" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  Real-time weather data and forecasts for Agadir. Stay informed about weather conditions affecting the
                  city.
                </p>
                <Button 
                  as={Link} 
                  to="/weather" 
                  className="w-100 border-0 rounded-3 py-2 fw-medium"
                  style={{
                    background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                    color: "white",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  View Weather
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} className="mb-4">
            <Card className="card-custom h-100 border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ color: "var(--burgundy)" }}>
                    <CalendarIcon />
                  </div>
                  <h5 className="mb-0" style={{ color: "var(--text-primary)" }}>City Events</h5>
                </div>
                <p className="mb-4" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  Discover upcoming events, festivals, and activities happening in Agadir. Stay connected with your
                  community.
                </p>
                <Button 
                  as={Link} 
                  to="/events" 
                  className="w-100 border-0 rounded-3 py-2 fw-medium"
                  style={{
                    background: "rgba(122, 47, 71, 0.1)",
                    color: "var(--burgundy)",
                    border: "1px solid var(--burgundy)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--burgundy)";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(122, 47, 71, 0.1)";
                    e.target.style.color = "var(--burgundy)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Browse Events
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4} className="mb-4">
            <Card className="card-custom h-100 border-0">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3" style={{ color: "var(--deep-teal)" }}>
                    <MapIcon />
                  </div>
                  <h5 className="mb-0" style={{ color: "var(--text-primary)" }}>Interactive Map</h5>
                </div>
                <p className="mb-4" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  Explore Agadir with our interactive map. Find locations, services, and points of interest throughout
                  the city.
                </p>
                <Button 
                  as={Link} 
                  to="/map" 
                  className="w-100 rounded-3 py-2 fw-medium"
                  style={{
                    background: "transparent",
                    color: "var(--deep-teal)",
                    border: "1px solid var(--deep-teal)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "var(--deep-teal)";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = "var(--deep-teal)";
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  Open Map
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* World Cup 2030 Section */}
        <Row className="mt-5">
          <Col lg={8} className="mx-auto">
            <Card className="card-custom text-center border-0">
              <Card.Body className="p-5">
                <div className="mb-4" style={{ color: "var(--gold)" }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </div>
                <h3 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
                  Ready for World Cup 2030
                </h3>
                <p className="lead mb-4" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  Agadir is preparing to host the world's biggest football celebration. Our smart city infrastructure is
                  being enhanced to welcome millions of visitors.
                </p>
                
                {/* Countdown */}
                <div className="mb-4 p-3 rounded-3" style={{
                  background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(10, 61, 77, 0.1)",
                  border: "1px solid var(--gold)"
                }}>
                  <h4 className="fw-bold mb-2" style={{ color: "var(--gold)" }}>Countdown to World Cup 2030</h4>
                  <h2 className="fw-bold" style={{ color: "var(--text-primary)" }}>
                    {daysUntilWC} days
                  </h2>
                  <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                    Until June 8, 2030
                  </small>
                </div>

                <div className="d-flex justify-content-center gap-4 mt-4">
                  <div className="text-center">
                    <div className="fw-bold fs-4" style={{ color: "var(--deep-teal)" }}>
                      2030
                    </div>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>World Cup Year</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold fs-4" style={{ color: "var(--burgundy)" }}>
                      3
                    </div>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>Host Countries</small>
                  </div>
                  <div className="text-center">
                    <div className="fw-bold fs-4" style={{ color: "var(--gold)" }}>
                      48
                    </div>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>Teams</small>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard