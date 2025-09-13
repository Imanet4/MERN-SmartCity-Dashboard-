"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { weatherAPI } from "../services/api"
import { useTheme } from "../context/ThemeContext"

const Weather = () => {
  const { t } = useTranslation()
  const { isDarkMode } = useTheme()
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        const [currentResponse, forecastResponse] = await Promise.all([
          weatherAPI.getCurrentWeather(),
          weatherAPI.getForecast(5),
        ])

        setWeatherData({
          current: currentResponse.data.current,
          forecast: forecastResponse.data.forecast,
        })
      } catch (error) {
        console.error("Failed to fetch weather data:", error)
        setError("Failed to load weather data. Please try again later.")

        setWeatherData({
          current: {
            temperature: 24,
            condition: "Sunny",
            humidity: 65,
            windSpeed: 12,
            icon: "☀️",
          },
          forecast: [
            { day: "Today", high: 26, low: 18, condition: "Sunny", icon: "☀️" },
            { day: "Tomorrow", high: 28, low: 20, condition: "Partly Cloudy", icon: "⛅" },
            { day: "Thursday", high: 25, low: 17, condition: "Cloudy", icon: "☁️" },
            { day: "Friday", high: 23, low: 16, condition: "Light Rain", icon: "🌦️" },
            { day: "Saturday", high: 27, low: 19, condition: "Sunny", icon: "☀️" },
          ],
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  // Custom SVG Icons
  const HumidityIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 7.83a10 10 0 0 0-10 0A10 10 0 0 0 2 17.66a10 10 0 0 0 20 0 10 10 0 0 0-5-9.83z"></path>
      <path d="M12 7v10"></path>
      <path d="M7 12h10"></path>
    </svg>
  )

  const WindIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
    </svg>
  )

  const FeelsLikeIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
    </svg>
  )

  const MapIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  )

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: isDarkMode 
          ? "var(--bg-primary)" 
          : "linear-gradient(135deg, #e6f2f2 0%, #f9f1f4 100%)",
      }}>
        <div className="text-center">
          <Spinner animation="border" style={{ color: "var(--deep-teal)" }} className="mb-3" />
          <h5 style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>{t("common.loading")}</h5>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{
        background: isDarkMode 
          ? "var(--bg-primary)" 
          : "linear-gradient(135deg, #e6f2f2 0%, #f9f1f4 100%)",
      }}>
        <div className="text-center">
          <div className="fs-1 mb-3" style={{ color: "var(--danger)" }}>⚠️</div>
          <h5 className="mb-3" style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>{error}</h5>
          <button 
            className="btn mt-3 rounded-3 px-4 py-2 fw-medium border-0"
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
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-vh-100 py-5" style={{
      background: isDarkMode 
        ? "var(--bg-primary)" 
        : "linear-gradient(135deg, #e6f2f2 0%, #f9f1f4 100%)",
      color: isDarkMode ? "var(--text-primary)" : "inherit",
      transition: "all 0.3s ease"
    }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center mb-4 fw-bold" style={{ color: "var(--deep-teal)" }}>
              {t("weather.title")} - Agadir
            </h1>
          </Col>
        </Row>

        {/* Current Weather */}
        <Row className="mb-5 justify-content-center">
          <Col xl={8} lg={10}>
            <Card className="card-custom border-0 text-center">
              <div className="py-4" style={{
                background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                color: "white",
                borderBottom: "2px solid var(--gold)"
              }}>
                <h3 className="mb-0 fw-bold">{t("weather.current")}</h3>
              </div>
              <Card.Body className="p-5">
                <div className="fs-1 mb-4" style={{ color: "var(--deep-teal)" }}>
                  {weatherData.current.icon}
                </div>
                <h1 className="display-3 fw-bold mb-3" style={{ 
                  background: "linear-gradient(135deg, var(--deep-teal), var(--burgundy))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}>
                  {weatherData.current.temperature}°C
                </h1>
                <h4 className="mb-5" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  {weatherData.current.condition}
                </h4>

                <Row className="justify-content-center">
                  <Col md={4} className="mb-4">
                    <div className="text-center p-3 rounded-3 h-100" style={{
                      background: isDarkMode 
                        ? "rgba(255, 255, 255, 0.05)" 
                        : "rgba(10, 61, 77, 0.1)",
                      border: "1px solid var(--deep-teal)"
                    }}>
                      <div className="mb-3" style={{ color: "var(--deep-teal)" }}>
                        <HumidityIcon />
                      </div>
                      <h5 className="fw-bold mb-2" style={{ color: "var(--deep-teal)" }}>
                        {weatherData.current.humidity}%
                      </h5>
                      <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        {t("weather.humidity")}
                      </small>
                    </div>
                  </Col>
                  <Col md={4} className="mb-4">
                    <div className="text-center p-3 rounded-3 h-100" style={{
                      background: isDarkMode 
                        ? "rgba(255, 255, 255, 0.05)" 
                        : "rgba(122, 47, 71, 0.1)",
                      border: "1px solid var(--burgundy)"
                    }}>
                      <div className="mb-3" style={{ color: "var(--burgundy)" }}>
                        <WindIcon />
                      </div>
                      <h5 className="fw-bold mb-2" style={{ color: "var(--burgundy)" }}>
                        {weatherData.current.windSpeed} km/h
                      </h5>
                      <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        {t("weather.wind")}
                      </small>
                    </div>
                  </Col>
                  <Col md={4} className="mb-4">
                    <div className="text-center p-3 rounded-3 h-100" style={{
                      background: isDarkMode 
                        ? "rgba(255, 255, 255, 0.05)" 
                        : "rgba(200, 169, 113, 0.1)",
                      border: "1px solid var(--gold)"
                    }}>
                      <div className="mb-3" style={{ color: "var(--gold)" }}>
                        <FeelsLikeIcon />
                      </div>
                      <h5 className="fw-bold mb-2" style={{ color: "var(--gold)" }}>
                        26°C
                      </h5>
                      <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        Real Feel
                      </small>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 5-Day Forecast */}
        <Row className="mb-4">
          <Col>
            <h3 className="text-center mb-4 fw-bold" style={{ color: "var(--deep-teal)" }}>
              5-Day Forecast
            </h3>
          </Col>
        </Row>

        <Row className="justify-content-center">
          {weatherData.forecast.map((day, index) => (
            <Col xl={2} lg={4} md={6} key={index} className="mb-4">
              <Card className="card-custom h-100 text-center border-0">
                <Card.Body className="p-4">
                  <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
                    {day.day}
                  </h6>
                  <div className="fs-2 mb-3" style={{ color: "var(--deep-teal)" }}>
                    {day.icon}
                  </div>
                  <div className="mb-3">
                    <span className="fw-bold fs-5 me-2" style={{ color: "var(--burgundy)" }}>
                      {day.high}°
                    </span>
                    <span style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                      {day.low}°
                    </span>
                  </div>
                  <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                    {day.condition}
                  </small>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Weather Map Placeholder */}
        <Row className="mt-5 justify-content-center">
          <Col xl={10} lg={12}>
            <Card className="card-custom border-0">
              <div className="py-3 px-4" style={{
                background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                color: "white",
                borderBottom: "2px solid var(--gold)"
              }}>
                <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                  <MapIcon width="20" height="20" />
                  Weather Map
                </h5>
              </div>
              <Card.Body className="p-4">
                <div
                  className="rounded d-flex align-items-center justify-content-center"
                  style={{ 
                    height: "300px",
                    background: isDarkMode 
                      ? "rgba(255, 255, 255, 0.05)" 
                      : "rgba(10, 61, 77, 0.1)",
                    border: "1px solid var(--border-color)"
                  }}
                >
                  <div className="text-center" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                    <div className="fs-1 mb-3">🌍</div>
                    <h5>Interactive Weather Map</h5>
                    <p>Weather radar and satellite imagery coming soon</p>
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

export default Weather
