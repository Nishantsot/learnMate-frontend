import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ dynamic backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Attach JWT token
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

// ✅ Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      // 🔥 Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("userName");

      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;