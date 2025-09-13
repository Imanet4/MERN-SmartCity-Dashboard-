"use client"

import { useState, useEffect } from "react"

// Custom hook for API calls with loading and error states
export const useApi = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await apiCall()
        setData(response.data)
      } catch (err) {
        setError(err.response?.data?.message || err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, dependencies)

  const refetch = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      setData(response.data)
    } catch (err) {
      setError(err.response?.data?.message || err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, refetch }
}

// Hook for mutations (POST, PUT, DELETE)
export const useMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (apiCall) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiCall()
      return { success: true, data: response.data }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "An error occurred"
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  return { mutate, loading, error }
}
