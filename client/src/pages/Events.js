"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, Modal, Form, Badge, Alert, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useAuth } from "../context/AuthContext"
import { eventsAPI } from "../services/api"
import { useTheme } from "../context/ThemeContext"

const Events = () => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth()
  const { isDarkMode } = useTheme()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "cultural",
  })

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await eventsAPI.getEvents({
          page: 1,
          limit: 20,
          sortBy: "date",
          sortOrder: "asc",
        })

        setEvents(response.data.events)
      } catch (error) {
        console.error("Failed to fetch events:", error)
        setError("Failed to load events. Please try again later.")

        setEvents([
          {
            _id: 1,
            title: "Agadir Festival of Arts",
            description: "Annual celebration of Moroccan arts and culture featuring local artists and performers.",
            date: "2024-03-15",
            location: "Agadir Marina",
            category: "cultural",
            attendeeCount: 1200,
          },
          {
            _id: 2,
            title: "Smart City Tech Conference",
            description: "Exploring the future of urban technology and sustainable development in Morocco.",
            date: "2024-03-20",
            location: "Agadir Convention Center",
            category: "technology",
            attendeeCount: 800,
          },
          {
            _id: 3,
            title: "Beach Volleyball Tournament",
            description: "International beach volleyball championship on Agadir's beautiful coastline.",
            date: "2024-03-25",
            location: "Agadir Beach",
            category: "sports",
            attendeeCount: 2500,
          },
          {
            _id: 4,
            title: "Souk Al-Had Market Tour",
            description: "Guided tour of the traditional market with local artisans and food tastings.",
            date: "2024-03-30",
            location: "Souk Al-Had",
            category: "cultural",
            attendeeCount: 150,
          },
          {
            _id: 5,
            title: "World Cup 2030 Preparation Meeting",
            description:
              "Community meeting to discuss infrastructure and tourism preparations for FIFA World Cup 2030.",
            date: "2024-04-05",
            location: "City Hall",
            category: "community",
            attendeeCount: 300,
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      const response = await eventsAPI.createEvent(newEvent)

      setEvents([response.data.event, ...events])
      setNewEvent({ title: "", description: "", date: "", location: "", category: "cultural" })
      setShowModal(false)
      setSuccess("Event created successfully!")

      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error("Failed to create event:", error)
      setError(error.response?.data?.message || "Failed to create event")
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      cultural: "var(--deep-teal)",
      technology: "var(--burgundy)",
      sports: "var(--gold)",
      community: "var(--success)",
    }
    return colors[category] || "var(--text-secondary)"
  }

  // Custom SVG Icons
const CulturalIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"></path>
    <path d="M2 12h20"></path>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
)

  const TechnologyIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  )

  const SportsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M16 8l-8 8"></path>
      <path d="M8 8l8 8"></path>
    </svg>
  )

  const CommunityIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )

  const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )

  const AttendeesIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  )

  const getCategoryIcon = (category) => {
    const icons = {
      cultural: <CulturalIcon />,
      technology: <TechnologyIcon />,
      sports: <SportsIcon />,
      community: <CommunityIcon />,
    }
    return icons[category] || <CulturalIcon />
  }

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

  return (
    <div className="min-vh-100 py-5" style={{
      background: isDarkMode 
        ? "var(--bg-primary)" 
        : "linear-gradient(135deg, #e6f2f2 0%, #f9f1f4 100%)",
      color: isDarkMode ? "var(--text-primary)" : "inherit",
      transition: "all 0.3s ease"
    }}>
      <Container>
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <h1 className="fw-bold" style={{ color: "var(--deep-teal)" }}>{t("events.title")}</h1>
                <p style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                  Discover what's happening in Agadir
                </p>
              </div>
              {isAuthenticated && (
                <Button 
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
                  onClick={() => setShowModal(true)}
                >
                  {t("events.create")}
                </Button>
              )}
            </div>
          </Col>
        </Row>

        {/* Error and Success Alerts */}
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)} className="rounded-3">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" dismissible onClose={() => setSuccess(null)} className="rounded-3">
            {success}
          </Alert>
        )}

        {/* Events Grid */}
        <Row>
          {events.map((event) => (
            <Col xl={4} md={6} key={event._id || event.id} className="mb-4">
              <Card className="card-custom h-100 border-0">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <Badge
                      className="rounded-pill px-3 py-2 fw-medium d-flex align-items-center gap-1"
                      style={{
                        background: getCategoryColor(event.category),
                        color: "white",
                      }}
                    >
                      {getCategoryIcon(event.category)}
                      {event.category}
                    </Badge>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                      {new Date(event.date).toLocaleDateString()}
                    </small>
                  </div>

                  <h5 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>
                    {event.title}
                  </h5>

                  <p className="mb-3" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                    {event.description}
                  </p>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <span className="me-2" style={{ color: "var(--deep-teal)" }}>
                        <LocationIcon />
                      </span>
                      <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        {event.location}
                      </small>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-2" style={{ color: "var(--burgundy)" }}>
                        <AttendeesIcon />
                      </span>
                      <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        {event.attendeeCount || event.attendees || 0} attendees
                      </small>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-grow-1 rounded-3 border-0 fw-medium"
                      style={{
                        background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                        color: "white",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      {t("common.view")}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline-secondary"
                      className="rounded-3 fw-medium"
                      style={{
                        borderColor: isDarkMode ? "var(--border-color)" : "#dee2e6",
                        color: isDarkMode ? "var(--text-primary)" : "inherit",
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = isDarkMode ? "var(--border-color)" : "#f8f9fa";
                        e.target.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "transparent";
                        e.target.style.transform = "translateY(0)";
                      }}
                    >
                      Share
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Create Event Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header 
            closeButton 
            className="border-0"
            style={{
              background: isDarkMode ? "var(--bg-card)" : "white",
              color: isDarkMode ? "var(--text-primary)" : "inherit"
            }}
          >
            <Modal.Title>{t("events.create")}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            background: isDarkMode ? "var(--bg-card)" : "white",
            color: isDarkMode ? "var(--text-primary)" : "inherit"
          }}>
            <Form onSubmit={handleCreateEvent}>
              <Form.Group className="mb-3">
                <Form.Label>Event Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  required
                  className="rounded-3"
                  style={{
                    background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                    color: isDarkMode ? "var(--text-primary)" : "inherit"
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  required
                  className="rounded-3"
                  style={{
                    background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                    color: isDarkMode ? "var(--text-primary)" : "inherit"
                  }}
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>{t("events.date")}</Form.Label>
                    <Form.Control
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                      required
                      className="rounded-3"
                      style={{
                        background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                        borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                        color: isDarkMode ? "var(--text-primary)" : "inherit"
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={newEvent.category}
                      onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                      className="rounded-3"
                      style={{
                        background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                        borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                        color: isDarkMode ? "var(--text-primary)" : "inherit"
                      }}
                    >
                      <option value="cultural">Cultural</option>
                      <option value="technology">Technology</option>
                      <option value="sports">Sports</option>
                      <option value="community">Community</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>{t("events.location")}</Form.Label>
                <Form.Control
                  type="text"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  required
                  className="rounded-3"
                  style={{
                    background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                    color: isDarkMode ? "var(--text-primary)" : "inherit"
                  }}
                />
              </Form.Group>

              <div className="d-flex gap-2">
                <Button 
                  type="submit" 
                  className="rounded-3 px-4 py-2 fw-medium border-0 flex-grow-1"
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
                  {t("common.save")}
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => setShowModal(false)}
                  className="rounded-3 px-4 py-2 fw-medium flex-grow-1"
                  style={{
                    background: isDarkMode ? "var(--bg-secondary)" : "#f8f9fa",
                    borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                    color: isDarkMode ? "var(--text-primary)" : "inherit",
                    transition: "all 0.3s ease"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = isDarkMode ? "var(--border-color)" : "#e9ecef";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = isDarkMode ? "var(--bg-secondary)" : "#f8f9fa";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  {t("common.cancel")}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  )
}

export default Events