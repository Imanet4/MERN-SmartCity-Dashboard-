"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"

const Login = () => {
  const { t } = useTranslation()
  const { login } = useAuth()
  const { isDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || "/dashboard"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(formData.email, formData.password)

    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-vh-100 d-flex align-items-center py-5" style={{
      background: isDarkMode 
        ? "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)" 
        : "linear-gradient(135deg, #e6f2f2 0%, #f9f1f4 100%)",
      padding: "2rem 0",
      transition: "background 0.3s ease"
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="border-0 overflow-hidden" style={{
              background: isDarkMode 
                ? "var(--bg-card)" 
                : "linear-gradient(135deg, rgba(255, 250, 245, 0.95) 0%, rgba(255, 248, 240, 0.95) 100%)",
              backdropFilter: "blur(10px)",
              borderRadius: "20px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              color: isDarkMode ? "var(--text-primary)" : "inherit"
            }}>
              <div className="text-center py-4" style={{
                background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                color: "white",
                borderBottom: "2px solid var(--gold)"
              }}>
                <h3 className="mb-0 fw-bold">{t("auth.loginTitle")}</h3>
              </div>
              <Card.Body className="p-4">
                {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium" style={{color: isDarkMode ? "var(--text-primary)" : "inherit"}}>
                      {t("auth.email")}
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-3 p-3"
                      style={{
                        background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.7)",
                        border: "2px solid var(--deep-teal)",
                        color: "var(--text-primary)",
                        transition: "all 0.3s ease"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--burgundy)";
                        e.target.style.boxShadow = "0 0 0 0.2rem rgba(122, 47, 71, 0.25)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--deep-teal)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-medium" style={{color: isDarkMode ? "var(--text-primary)" : "inherit"}}>
                      {t("auth.password")}
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="rounded-3 p-3"
                      style={{
                        background: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.7)",
                        border: "2px solid var(--deep-teal)",
                        color: "var(--text-primary)",
                        transition: "all 0.3s ease"
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "var(--burgundy)";
                        e.target.style.boxShadow = "0 0 0 0.2rem rgba(122, 47, 71, 0.25)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "var(--deep-teal)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check 
                      type="checkbox" 
                      label="Remember me" 
                      style={{color: isDarkMode ? "var(--text-primary)" : "inherit"}}
                    />
                    <Link to="/forgot-password" className="text-decoration-none fw-medium" style={{color: "var(--deep-teal)"}}>
                      {t("auth.forgotPassword")}
                    </Link>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-100 mb-3 p-3 border-0 rounded-3 fw-medium" 
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
                    {loading ? t("common.loading") : t("nav.login")}
                  </Button>
                </Form>

                <div className="text-center pt-3" style={{color: isDarkMode ? "var(--text-primary)" : "inherit"}}>
                  <span>{t("auth.noAccount")} </span>
                  <Link to="/register" className="text-decoration-none fw-medium" style={{color: "var(--deep-teal)"}}>
                    {t("nav.register")}
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login