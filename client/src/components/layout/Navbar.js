"use client"
import { Navbar as BootstrapNavbar, Nav, Container, Dropdown, Button } from "react-bootstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAuth } from "../../context/AuthContext"
import { useTheme } from "../../context/ThemeContext"

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const { user, logout, isAuthenticated } = useAuth()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  // Custom SVG icons for dark/light mode
  const MoonIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  const SunIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
  );

  return (
    <BootstrapNavbar expand="lg" className="header-custom sticky-top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <div className="me-2 fs-4" style={{filter: "brightness(0) invert(1)"}}>
            <i className="fas fa-city"></i>
          </div>
          <div>
            <h1 className="fw-bold mb-0 fs-4">SmartCity Dashboard</h1>
            <span className="fs-6">Agadir</span>
          </div>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0 text-white" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ gap: "1.5rem", marginLeft: "2rem" }}>
            <Nav.Link 
              as={Link} 
              to="/dashboard" 
              className={`text-white nav-link-custom ${isActive("/dashboard")}`}
            >
              {t("nav.dashboard")}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/weather" 
              className={`text-white nav-link-custom ${isActive("/weather")}`}
            >
              {t("nav.weather")}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/events" 
              className={`text-white nav-link-custom ${isActive("/events")}`}
            >
              {t("nav.events")}
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/map" 
              className={`text-white nav-link-custom ${isActive("/map")}`}
            >
              {t("nav.map")}
            </Nav.Link>
          </Nav>

          <Nav className="align-items-center gap-3">
            {/* Language Switcher */}
            <div className="language-switcher">
              <Button 
                variant="link" 
                onClick={() => changeLanguage("en")} 
                className={`language-btn ${i18n.language === 'en' ? 'active' : ''}`}
              >
                EN
              </Button>
              <Button 
                variant="link" 
                onClick={() => changeLanguage("ar")} 
                className={`language-btn ${i18n.language === 'ar' ? 'active' : ''}`}
              >
                AR
              </Button>
              <Button 
                variant="link" 
                onClick={() => changeLanguage("fr")} 
                className={`language-btn ${i18n.language === 'fr' ? 'active' : ''}`}
              >
                FR
              </Button>
            </div>

            {/* Dark Mode Toggle */}
            <Button 
              variant="link" 
              onClick={toggleDarkMode} 
              className="theme-toggle position-relative d-flex align-items-center justify-content-center"
              title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              style={{width: "45px", height: "45px"}}
            >
              {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </Button>

            {/* User Menu */}
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle className="city-selector d-flex align-items-center gap-2">
                  <i className="fas fa-user-circle"></i> {user?.firstName || "User"}
                </Dropdown.Toggle>
                <Dropdown.Menu className="mt-2 p-2 border-0" style={{
                  background: "var(--bg-card)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "20px",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  border: "1px solid var(--border-color)",
                  minWidth: "200px"
                }}>
                  <Dropdown.Item 
                    as={Link} 
                    to="/profile" 
                    className="d-flex align-items-center gap-3 p-3 rounded-3 mb-2"
                    style={{
                      color: "var(--text-primary)",
                      transition: "all 0.3s ease",
                      background: "transparent"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(10, 61, 77, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle" style={{
                      width: "32px",
                      height: "32px",
                      background: "linear-gradient(135deg, var(--deep-teal) 0%, var(--burgundy) 100%)",
                      color: "white"
                    }}>
                      <i className="fas fa-user fs-6"></i>
                    </div>
                    <div>
                      <div className="fw-medium">{t("nav.profile")}</div>
                      <small style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>View your profile</small>
                    </div>
                  </Dropdown.Item>
                  
                  <hr className="my-2" style={{ borderColor: "var(--border-color)" }} />
                  
                  <Dropdown.Item 
                    onClick={handleLogout} 
                    className="d-flex align-items-center gap-3 p-3 rounded-3"
                    style={{
                      color: "var(--danger)",
                      transition: "all 0.3s ease",
                      background: "transparent"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(220, 53, 69, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-center rounded-circle" style={{
                      width: "32px",
                      height: "32px",
                      background: "rgba(220, 53, 69, 0.1)",
                      color: "var(--danger)"
                    }}>
                      <i className="fas fa-sign-out-alt fs-6"></i>
                    </div>
                    <div>
                      <div className="fw-medium">{t("nav.logout")}</div>
                      <small style={{ color: "var(--text-secondary)", fontSize: "0.8rem" }}>Sign out of your account</small>
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex gap-2">
                <Button as={Link} to="/login" className="language-btn">
                  {t("nav.login")}
                </Button>
                <Button as={Link} to="/register" className="language-btn active">
                  {t("nav.register")}
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
      
      {/* Add custom CSS for hover effects */}
      <style>{`
        .nav-link-custom {
          position: relative;
          padding: 0.5rem 0;
          margin: 0 0.5rem;
          transition: all 0.3s ease;
        }
        
        .nav-link-custom::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: white;
          transition: width 0.3s ease;
        }
        
        .nav-link-custom:hover::after,
        .nav-link-custom.active::after {
          width: 100%;
        }
        
        .nav-link-custom:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </BootstrapNavbar>
  )
}

export default Navbar