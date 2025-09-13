import { Container, Row, Col } from "react-bootstrap"
import { useTranslation } from "react-i18next"

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="date-display-container mt-auto pt-4 pb-3">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="text-white mb-3">Smart City Agadir</h5>
            <p className="text-white mb-3">{t("dashboard.subtitle")}</p>
            <div className="d-flex gap-3 fs-5">
              <i className="fas fa-building"></i>
              <i className="fas fa-globe-africa"></i>
              <i className="fas fa-bolt"></i>
            </div>
          </Col>

          <Col md={4}>
            <h6 className="text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/dashboard" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-tachometer-alt fs-6"></i> Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="/weather" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-cloud-sun fs-6"></i> Weather
                </a>
              </li>
              <li className="mb-2">
                <a href="/events" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-calendar-alt fs-6"></i> Events
                </a>
              </li>
              <li className="mb-2">
                <a href="/map" className="text-white text-decoration-none d-flex align-items-center gap-2">
                  <i className="fas fa-map-marked-alt fs-6"></i> City Map
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="text-white mb-3">Contact Info</h6>
            <p className="text-white mb-2 d-flex align-items-center gap-2">
              <i className="fas fa-map-marker-alt"></i> Agadir, Morocco
            </p>
            <p className="text-white mb-2 d-flex align-items-center gap-2">
              <i className="fas fa-envelope"></i> info@smartcity-agadir.ma
            </p>
            <p className="text-white mb-2 d-flex align-items-center gap-2">
              <i className="fas fa-phone"></i> +212 528 XX XX XX
            </p>
          </Col>
        </Row>

        <hr className="border-light my-4" />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="text-white mb-0 small">
              © 2024 Smart City Agadir. Built for World Cup 2030 <i className="fas fa-trophy ms-1"></i>
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <small className="text-white">
              Made with <i className="fas fa-heart text-danger">❤️</i> for Morocco <i className="fas fa-flag ms-1"></i>
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer