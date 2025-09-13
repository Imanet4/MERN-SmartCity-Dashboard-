"use client"

import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

// Components
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Dashboard from "./pages/Dashboard"
import Weather from "./pages/Weather"
import Events from "./pages/Events"
import MapView from "./pages/MapView"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Profile from "./pages/Profile"

// Context
import { AuthProvider } from "./context/AuthContext"
import { ThemeProvider } from "./context/ThemeContext"

// Utils
import ProtectedRoute from "./components/auth/ProtectedRoute"

function App() {
  const { i18n } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set document direction based on language
    const direction = i18n.language === "ar" ? "rtl" : "ltr"
    document.documentElement.setAttribute("dir", direction)
    document.documentElement.setAttribute("lang", i18n.language)

    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [i18n.language])

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="text-muted">Smart City Dashboard</h5>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App min-vh-100 d-flex flex-column">
            <Navbar />
            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/events" element={<Events />} />
                <Route path="/map" element={<MapView />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
            {/* Amazigh Watermark */}
            <div className="amazigh-watermark">ⵣ</div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
