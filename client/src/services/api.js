import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// API service functions
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.post("/auth/reset-password", { token, password }),
}

export const userAPI = {
  getProfile: () => api.get("/users/profile"),
  updateProfile: (data) => api.put("/users/profile", data),
  getStats: () => api.get("/users/stats"),
  uploadAvatar: (formData) => api.post("/users/avatar", formData),
}

export const eventsAPI = {
  getEvents: (params) => api.get("/events", { params }),
  getEvent: (id) => api.get(`/events/${id}`),
  createEvent: (data) => api.post("/events", data),
  updateEvent: (id, data) => api.put(`/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  joinEvent: (id) => api.post(`/events/${id}/join`),
  leaveEvent: (id) => api.post(`/events/${id}/leave`),
}

export const weatherAPI = {
  getCurrentWeather: () => api.get("/weather/current"),
  getForecast: (days = 5) => api.get(`/weather/forecast?days=${days}`),
  getWeatherAlerts: () => api.get("/weather/alerts"),
  getHistoricalWeather: (startDate, endDate) =>
    api.get(`/weather/historical?startDate=${startDate}&endDate=${endDate}`),
}

export const mapAPI = {
  getLocations: (type) => api.get(`/locations${type ? `?type=${type}` : ""}`),
  getLocation: (id) => api.get(`/locations/${id}`),
  searchLocations: (query) => api.get(`/locations/search?q=${query}`),
  getLocationTypes: () => api.get("/locations/types"),
  addLocationReview: (id, rating, comment) => api.post(`/locations/${id}/review`, { rating, comment }),
  checkInToLocation: (id) => api.post(`/locations/${id}/checkin`),
}

export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getUserActivity: () => api.get("/dashboard/activity"),
}

export default api
