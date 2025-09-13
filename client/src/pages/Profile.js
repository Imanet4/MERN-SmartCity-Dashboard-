"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from "react-bootstrap"
import { useTranslation } from "react-i18next"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

const Profile = () => {
  const { t } = useTranslation()
  const { user, updateProfile } = useAuth()
  const { isDarkMode } = useTheme()
  const [activeTab, setActiveTab] = useState("profile")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "Agadir",
    bio: user?.bio || "",
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    notifications: true,
    emailUpdates: true,
    darkMode: false,
  })

  // Custom SVG Icons
  const ProfileIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  )

  const SettingsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 极速快3 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
)

  const SecurityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 8v4"></path>
      <path d="M12 16h.01"></path>
    </svg>
  )

  const CalendarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x极速快3 y1="10" x2="21" y2="10"></line>
    </svg>
  )

  const EventIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  )

  const StarIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  )

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const result = await updateProfile(profileData)

    if (result.success) {
      setMessage("Profile updated successfully!")
    } else {
      setMessage(result.message)
    }

    setLoading(false)
  }

  const handlePreferencesSubmit = (e) => {
    e.preventDefault()
    // Save preferences to localStorage or API
    localStorage.setItem("userPreferences", JSON.stringify(preferences))
    setMessage("Preferences saved successfully!")
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
        <Row>
          <Col lg={8} className="mx-auto">
            <Card className="card-custom border-0">
              <div className="py-4 text-center" style={{
                background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                color: "white",
                borderBottom: "2px solid var(--gold)",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px"
              }}>
                <div className="mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)"
                  }}>
                    <ProfileIcon />
                  </div>
                </div>
                <h3 className="mb-1 fw-bold">{t("nav.profile")}</h3>
                <p className="mb-0 opacity-75">Manage your account settings</p>
              </div>

              <Card.Body className="p-4">
                {message && (
                  <Alert variant={message.includes("success") ? "success" : "danger"} className="rounded-3 mb-4">
                    {message}
                  </Alert>
                )}

                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
                  {/* Profile Information Tab */}
                  <Tab eventKey="profile" title={
                    <span className="d-flex align-items-center gap-2">
                      <ProfileIcon />
                      Profile Info
                    </span>
                  }>
                    <Form onSubmit={handleProfileSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                              {t("auth.firstName")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value={profileData.firstName}
                              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
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
                            <Form.Label style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                              {t("auth.lastName")}
                            </Form.Label>
                            <Form.Control
                              type="text"
                              value= {profileData.lastName}
                              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                              className="rounded-3"
                              style={{
                                background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                                borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                                color: isDarkMode ? "var(--text-primary)" : "inherit"
                              }}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                          {t("auth.email")}
                        </Form.Label>
                        <Form.Control
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
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
                            <Form.Label style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                              Phone Number
                            </Form.Label>
                            <Form.Control
                              type="tel"
                              value={profileData.phone}
                              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                              placeholder="+212 XXX XXX XXX"
                              className="rounded-3"
                              style={{
                                background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                                borderColor: isDarkMode ? "极速快3(--border-color)" : "#ced4da",
                                color: isDarkMode ? "var(--text-primary)" : "inherit"
                              }}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                              City
                            </Form.Label>
                            <Form.Select
                              value={profileData.city}
                              onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                              className="rounded-3"
                              style={{
                                background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                                borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                                color: isDarkMode ? "var(--text-primary)" : "inherit"
                              }}
                            >
                              <option value="Agadir">Agadir</option>
                              <option value="Casablanca">Casablanca</option>
                              <option value="Rabat">Rabat</option>
                              <option value="Marrakech">Marrakech</option>
                              <option value="Fes">Fes</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                          Address
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="rounded-3"
                          style={{
                            background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                            borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                            color: isDarkMode ? "var(--text-primary)" : "inherit"
                          }}
                        />
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                          Bio
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          placeholder="Tell us about yourself..."
                          className="rounded-3"
                          style={{
                            background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                            borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                            color: isDarkMode ? "var(--text-primary)" : "inherit"
                          }}
                        />
                      </Form.Group>

                      <Button 
                        type="submit" 
                        className="rounded-3 px-4 py-2 fw-medium border-0"
                        disabled={loading}
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
                        {loading ? t("common.loading") : t("common.save")}
                      </Button>
                    </Form>
                  </Tab>

                  {/* Preferences Tab */}
                  <Tab eventKey="preferences" title={
                    <span className="d-flex align-items-center gap-2">
                      <SettingsIcon />
                      Preferences
                    </span>
                  }>
                    <Form onSubmit={handlePreferencesSubmit}>
                      <Form.Group className="mb-4">
                      <Form.Label className="fw-medium" style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}>
                        Language Preference
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Select
                          value={preferences.language}
                          onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                          className="rounded-3 ps-5"
                          style={{
                            background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                            borderColor: isDarkMode ? "var(--border-color)" : "#ced4da",
                            color: isDarkMode ? "var(--text-primary)" : "inherit",
                            paddingLeft: "2.5rem",
                            backgroundImage: "none",
                            appearance: "none"
                          }}
                        >
                          <option value="en">English</option>
                          <option value="ar">العربية (Arabic)</option>
                          <option value="fr">Français (French)</option>
                        </Form.Select>
                        <div className="position-absolute top-50 start-0 translate-middle-y ms-3" style={{ zIndex: 5 }}>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                          </svg>
                        </div>
                        <div className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ zIndex: 5 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                      </div>
                      <Form.Text style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        Choose your preferred language for the interface
                      </Form.Text>
                    </Form.Group>

                      <div className="mb-4">
                        <h6 className="fw-bold mb-3" style={{ color: "var(--text-primary)" }}>Notification Settings</h6>
                        <Form.Check
                          type="switch"
                          id="notifications"
                          label="Enable push notifications"
                          checked={preferences.notifications}
                          onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
                          className="mb-2"
                          style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}
                        />
                        <Form.Check
                          type="switch"
                          id="emailUpdates"
                          label="Receive email updates"
                          checked={preferences.emailUpdates}
                          onChange={(e) => setPreferences({ ...preferences, emailUpdates: e.target.checked })}
                          className="mb-2"
                          style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}
                        />
                        <Form.Check
                          type="switch"
                          id="darkMode"
                          label="Dark mode"
                          checked={preferences.darkMode}
                          onChange={(e) => setPreferences({ ...preferences, darkMode: e.target.checked })}
                          style={{ color: isDarkMode ? "var(--text-primary)" : "inherit" }}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="rounded-3 px-4 py-2 fw-medium"
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
                        Save Preferences
                      </Button>
                    </Form>
                  </Tab>

                  {/* Account Security Tab */}
                  <Tab eventKey="security" title={
                    <span className="d-flex align-items-center gap-2">
                      <SecurityIcon />
                      Security
                    </span>
                  }>
                    <div className="text-center py-4">
                      <div className="mb-4">
                        <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{
                          width: "60px",
                          height: "60px",
                          background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                          color: "white"
                        }}>
                          <SecurityIcon />
                        </div>
                      </div>
                      <h5 style={{ color: "var(--text-primary)" }}>Account Security</h5>
                      <p className="mb-4" style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>
                        Manage your password and security settings to keep your account safe.
                      </p>

                      <div className="d-grid gap-3 max-width-300 mx-auto">
                        <Button 
                          className="rounded-3 border-0 fw-medium"
                          style={{
                            background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                            color: "white"
                          }}
                        >
                          Change Password
                        </Button>
                        <Button 
                          variant="outline-secondary"
                          className="rounded-3 fw-medium"
                          style={{
                            borderColor: isDarkMode ? "var(--border-color)" : "#dee2e6",
                            color: isDarkMode ? "var(--text-primary)" : "inherit"
                          }}
                        >
                          Two-Factor Authentication
                        </Button>
                        <Button 
                          variant="outline-info"
                          className="rounded-3 fw-medium"
                          style={{
                            borderColor: isDarkMode ? "var(--info)" : "#0dcaf0",
                            color: isDarkMode ? "var(--info)" : "#0dcaf0"
                          }}
                        >
                          Login History
                        </Button>
                        <Button 
                          variant="outline-danger"
                          className="rounded-3 fw-medium"
                          style={{
                            borderColor: isDarkMode ? "var(--danger)" : "#dc3545",
                            color: isDarkMode ? "var(--danger)" : "#dc3545"
                          }}
                        >
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>

            {/* Account Stats */}
            <Row className="mt-4">
              <Col md={4} className="mb-3">
                <Card className="card-custom border-0 text-center">
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ color: "var(--deep-teal)" }}>
                      <CalendarIcon />
                    </div>
                    <h6 style={{ color: "var(--text-primary)" }}>Member Since</h6>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>March 2024</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="card-custom border-0 text-center">
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ color: "var(--burgundy)" }}>
                      <EventIcon />
                    </div>
                    <h6 style={{ color: "var(--text-primary)" }}>Events Attended</h6>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>12 events</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4} className="mb-3">
                <Card className="card-custom border-0 text-center">
                  <Card.Body className="p-4">
                    <div className="mb-3" style={{ color: "var(--gold)" }}>
                      <StarIcon />
                    </div>
                    <h6 style={{ color: "var(--text-primary)" }}>Community Points</h6>
                    <small style={{ color: isDarkMode ? "var(--text-secondary)" : "#6c757d" }}>2,450 points</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile