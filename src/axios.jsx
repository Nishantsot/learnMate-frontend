import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // ✅ your Spring Boot backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ allow sending cookies/tokens across origins
});

// ✅ Attach JWT token (if present)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Optional: auto logout when token expires
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
