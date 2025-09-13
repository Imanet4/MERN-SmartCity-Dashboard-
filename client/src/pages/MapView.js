"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Button, ButtonGroup, Alert, Spinner } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { mapAPI } from "../services/api"
import { useTheme } from "../context/ThemeContext"

const MapView = () => {
  const { t } = useTranslation()
  const { isDarkMode } = useTheme()
  const [mapType, setMapType] = useState("satellite")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await mapAPI.getLocations()
        setLocations(response.data.locations)
      } catch (error) {
        console.error("Failed to fetch locations:", error)
        setError("Failed to load locations. Please try again later.")

        setLocations([
          {
            _id: 1,
            name: "Agadir Marina",
            type: "tourism",
            coordinates: { latitude: 30.4278, longitude: -9.5981 },
            description: "Beautiful marina with restaurants and shops",
            icon: "⚓",
          },
          {
            _id: 2,
            name: "Agadir Beach",
            type: "tourism",
            coordinates: { latitude: 30.4202, longitude: -9.5982 },
            description: "6km of golden sandy beach",
            icon: "🏖️",
          },
          {
            _id: 3,
            name: "Kasbah of Agadir Oufla",
            type: "historical",
            coordinates: { latitude: 30.4347, longitude: -9.5981 },
            description: "Historic fortress with panoramic views",
            icon: "🏰",
          },
          {
            _id: 4,
            name: "Souk Al-Had",
            type: "shopping",
            coordinates: { latitude: 30.4278, longitude: -9.6081 },
            description: "Traditional market with 6000 shops",
            icon: "🛒",
          },
          {
            _id: 5,
            name: "Agadir Stadium",
            type: "sports",
            coordinates: { latitude: 30.4178, longitude: -9.5881 },
            description: "Future World Cup 2030 venue",
            icon: "⚽",
          },
          {
            _id: 6,
            name: "City Hall",
            type: "government",
            coordinates: { latitude: 30.4278, longitude: -9.5781 },
            description: "Municipal government center",
            icon: "🏛️",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [])

  const getLocationsByType = (type) => {
    return locations.filter((loc) => loc.type === type)
  }

  const getTypeColor = (type) => {
    const colors = {
      tourism: "var(--deep-teal)",
      historical: "var(--burgundy)",
      shopping: "var(--gold)",
      sports: "var(--success)",
      government: "var(--info)",
    }
    return colors[type] || "var(--text-secondary)"
  }

  // Custom SVG Icons
  const SatelliteIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <path d="M12 16l4-4-4-4-4 4 4 4z"></path>
    </svg>
  )

  const StreetIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 19l16 0"></path>
      <path d="M4 15l4 0"></path>
      <path d="M12 15l8 0"></path>
      <path d="M4 11l16 0"></path>
      <path d="M4 7l16 0"></path>
      <path d="M8 3l0 4"></path>
      <path d="M12 3l0 4"></path>
    </svg>
  )

  const TerrainIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )

  const LocationIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )

  const DirectionsIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
      <path d="M2 2l7.586 7.586"></path>
      <circle cx="11" cy="11" r="2"></circle>
    </svg>
  )

  const ShareIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
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
          <h5 style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>Loading Map Data...</h5>
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
      <Container fluid>
        {error && (
          <Alert variant="warning" dismissible onClose={() => setError(null)} className="mb-4 rounded-3">
            {error}
          </Alert>
        )}

        <Row>
          <Col lg={3} className="mb-4">
            <Card className="card-custom border-0" style={{
              backdropFilter: "blur(10px)",
              position: "sticky",
              top: "120px",
              zIndex: 100
            }}>
              <div className="py-3 px-4 text-center" style={{
                background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                color: "white",
                borderBottom: "2px solid var(--gold)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px"
              }}>
                <h5 className="mb-0 fw-bold">{t("nav.map")}</h5>
              </div>
              <Card.Body>
                <div className="mb-4">
                  <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Map Type</h6>
                  <ButtonGroup className="w-100" vertical>
                    <Button
                      variant={mapType === "satellite" ? "primary" : "outline-primary"}
                      onClick={() => setMapType("satellite")}
                      size="sm"
                      className="rounded-3 mb-2 border-0 fw-medium d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: mapType === "satellite" 
                          ? "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)" 
                          : "transparent",
                        color: mapType === "satellite" ? "white" : "var(--deep-teal)",
                        border: mapType === "satellite" ? "none" : "1px solid var(--deep-teal)"
                      }}
                    >
                      <SatelliteIcon />
                      Satellite
                    </Button>
                    <Button
                      variant={mapType === "street" ? "primary" : "outline-primary"}
                      onClick={() => setMapType("street")}
                      size="sm"
                      className="rounded-3 mb-2 border-0 fw-medium d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: mapType === "street" 
                          ? "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)" 
                          : "transparent",
                        color: mapType === "street" ? "white" : "var(--deep-teal)",
                        border: mapType === "street" ? "none" : "1px solid var(--deep-teal)"
                      }}
                    >
                      <StreetIcon />
                      Street
                    </Button>
                    <Button
                      variant={mapType === "terrain" ? "primary" : "outline-primary"}
                      onClick={() => setMapType("terrain")}
                      size="sm"
                      className="rounded-3 border-0 fw-medium d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: mapType === "terrain" 
                          ? "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)" 
                          : "transparent",
                        color: mapType === "terrain" ? "white" : "var(--deep-teal)",
                        border: mapType === "terrain" ? "none" : "1px solid var(--deep-teal)"
                      }}
                    >
                      <TerrainIcon />
                      Terrain
                    </Button>
                  </ButtonGroup>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Points of Interest</h6>
                  {["tourism", "historical", "shopping", "sports", "government"].map((type) => (
                    <div key={type} className="mb-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        className="w-100 text-start rounded-3 fw-medium"
                        style={{
                          borderColor: getTypeColor(type),
                          color: isDarkMode ? "var(--text-primary)" : "inherit",
                          background: "transparent"
                        }}
                        onClick={() => setSelectedLocation(type)}
                      >
                        <span style={{ color: getTypeColor(type) }}>●</span>{" "}
                        {type.charAt(0).toUpperCase() + type.slice(1)} ({getLocationsByType(type).length})
                      </Button>
                    </div>
                  ))}
                </div>

                <div>
                  <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Quick Actions</h6>
                  <div className="d-grid gap-2">
                    <Button 
                      size="sm"
                      className="rounded-3 border-0 fw-medium d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                        color: "white"
                      }}
                    >
                      <LocationIcon />
                      My Location
                    </Button>
                    <Button 
                      size="sm"
                      className="rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2"
                      style={{
                        background: "rgba(122, 47, 71, 0.1)",
                        color: "var(--burgundy)",
                        border: "1px solid var(--burgundy)"
                      }}
                    >
                      <DirectionsIcon />
                      Directions
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      className="rounded-3 fw-medium d-flex align-items-center justify-content-center gap-2"
                      style={{
                        borderColor: isDarkMode ? "var(--border-color)" : "#dee2e6",
                        color: isDarkMode ? "var(--text-primary)" : "inherit"
                      }}
                    >
                      <ShareIcon />
                      Share Location
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Card className="card-custom border-0">
              <Card.Body className="p-0">
                <div
                  className="position-relative d-flex align-items-center justify-content-center"
                  style={{ 
                    height: "600px", 
                    borderRadius: "20px",
                    background: isDarkMode 
                      ? "rgba(255, 255, 255, 0.05)" 
                      : "rgba(10, 61, 77, 0.1)",
                    border: "1px solid var(--border-color)"
                  }}
                >
                  <div
                    className="position-absolute w-100 h-100"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 30% 30%, var(--deep-teal) 2px, transparent 2px),
                        radial-gradient(circle at 70% 70%, var(--burgundy) 1px, transparent 1px),
                        linear-gradient(45deg, rgba(10, 61, 77, 0.1) 25%, transparent 25%),
                        linear-gradient(-45deg, rgba(10, 61, 77, 0.1) 25%, transparent 25%)
                      `,
                      backgroundSize: "50px 50px, 30px 30px, 20px 20px, 20px 20px",
                      opacity: 0.3,
                      borderRadius: "20px",
                    }}
                  />

                  <div className="text-center position-relative z-index-1">
                    <div className="fs-1 mb-3" style={{ color: "var(--deep-teal)" }}>🗺️</div>
                    <h4 style={{ color: "var(--deep-teal)" }}>Interactive Map of Agadir</h4>
                    <p className="mb-4" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                      Explore the beautiful city of Agadir, Morocco
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                      <Button 
                        className="rounded-3 px-4 py-2 fw-medium border-0"
                        style={{
                          background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                          color: "white"
                        }}
                      >
                        Enable Satellite View
                      </Button>
                      <Button 
                        className="rounded-3 px-4 py-2 fw-medium"
                        style={{
                          background: "rgba(122, 47, 71, 0.1)",
                          color: "var(--burgundy)",
                          border: "1px solid var(--burgundy)"
                        }}
                      >
                        Find Locations
                      </Button>
                    </div>
                  </div>

                  {locations.slice(0, 6).map((location, index) => (
                    <div
                      key={location._id || location.id}
                      className="position-absolute"
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 10}%`,
                        cursor: "pointer",
                      }}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "40px",
                          height: "40px",
                          backgroundColor: getTypeColor(location.type),
                          color: "white",
                          fontSize: "1.2rem",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                        }}
                      >
                        {location.icon || "📍"}
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {selectedLocation && typeof selectedLocation === "object" && (
              <Card className="card-custom border-0 mt-4">
                <Card.Body className="p-4">
                  <Row>
                    <Col md={8}>
                      <div className="d-flex align-items-center mb-3">
                        <span className="fs-3 me-3">{selectedLocation.icon || "📍"}</span>
                        <div>
                          <h5 className="mb-1" style={{ color: "var(--text-primary)" }}>
                            {selectedLocation.name}
                          </h5>
                          <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                            {selectedLocation.type}
                          </small>
                        </div>
                      </div>
                      <p className="mb-3" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        {selectedLocation.description}
                      </p>
                      <div className="d-flex gap-2">
                        <Button 
                          size="sm"
                          className="rounded-3 border-0 fw-medium"
                          style={{
                            background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                            color: "white"
                          }}
                        >
                          Get Directions
                        </Button>
                        <Button 
                          size="sm"
                          className="rounded-3 fw-medium"
                          style={{
                            background: "rgba(122, 47, 71, 0.1)",
                            color: "var(--burgundy)",
                            border: "1px solid var(--burgundy)"
                          }}
                        >
                          Call
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          className="rounded-3 fw-medium"
                          style={{
                            borderColor: isDarkMode ? "var(--border-color)" : "#dee2e6",
                            color: isDarkMode ? "var(--text-primary)" : "inherit"
                          }}
                        >
                          Photos
                        </Button>
                      </div>
                    </Col>
                    <Col md={4} className="text-end">
                      <Button 
                        variant="outline-secondary" 
                        size="sm" 
                        onClick={() => setSelectedLocation(null)}
                        className="rounded-3 fw-medium"
                        style={{
                          borderColor: isDarkMode ? "var(--border-color)" : "#dee2e6",
                          color: isDarkMode ? "var(--text-primary)" : "inherit"
                        }}
                      >
                        Close
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Card className="card-custom border-0">
              <div className="py-3 px-4 text-center" style={{
                background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                color: "white",
                borderBottom: "2px solid var(--gold)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px"
              }}>
                <h4 className="mb-0 fw-bold">World Cup 2030 Venues</h4>
              </div>
              <Card.Body className="p-4">
                <Row>
                  <Col md={4} className="text-center mb-3">
                    <div className="fs-1 mb-2" style={{ color: "var(--deep-teal)" }}>⚽</div>
                    <h6 style={{ color: "var(--text-primary)" }}>Agadir Stadium</h6>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                      Main venue for World Cup matches
                    </small>
                  </Col>
                  <Col md={4} className="text-center mb-3">
                    <div className="fs-1 mb-2" style={{ color: "var(--burgundy)" }}>🏨</div>
                    <h6 style={{ color: "var(--text-primary)" }}>Fan Villages</h6>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                      Accommodation for international visitors
                    </small>
                  </Col>
                  <Col md={4} className="text-center mb-3">
                    <div className="fs-1 mb-2" style={{ color: "var(--gold)" }}>🚌</div>
                    <h6 style={{ color: "var(--text-primary)" }}>Transport Hubs</h6>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                      Enhanced public transportation
                    </small>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MapView