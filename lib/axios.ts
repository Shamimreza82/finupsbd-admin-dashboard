// lib/axios.ts
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000/api',
  withCredentials: true, // if you use cookies for auth
})


// Optional: Handle global errors
axiosInstance.interceptors.response.use((response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or show toast
      console.warn("Unauthorized, redirecting...")
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
