import axiosInstance from "./axios";

/* =========================================================
   🧩 AUTH MODULE — REGISTER / LOGIN / PASSWORD / OTP
========================================================= */

// REGISTER
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// VERIFY OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

// RESEND OTP
export const resendOtp = async (email) => {
  try {
    const response = await axiosInstance.post(`/auth/resend-otp?email=${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to resend OTP" };
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(`/auth/forgot-password?email=${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

// RESET PASSWORD
export const resetPassword = async (email, otp, newPassword) => {
  try {
    const response = await axiosInstance.post("/auth/reset-password", {
      email,
      otp,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Password reset failed" };
  }
};

/* =========================================================
   🧩 TUTOR MODULE — PERFECTLY MATCHED TO TutorController
========================================================= */

const tutorAxios = () => {
  const token = localStorage.getItem("token");
  return axiosInstance.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

/* -------------------- 📘 COURSES -------------------- */

// GET tutor courses  → backend = /tutor/courses
export const fetchTutorCourses = async () => {
  try {
    const res = await tutorAxios().get("/tutor/courses");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to load courses" };
  }
};

// CREATE course → backend = POST /tutor/courses
export const addCourse = async (data) => {
  try {
    const res = await tutorAxios().post("/tutor/courses", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add course" };
  }
};

// UPDATE course → PUT /tutor/courses/{id}
export const updateCourse = async (id, data) => {
  try {
    const res = await tutorAxios().put(`/tutor/courses/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Update failed" };
  }
};

// DELETE course → DELETE /tutor/courses/{id}
export const deleteCourse = async (id) => {
  try {
    const res = await tutorAxios().delete(`/tutor/courses/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Delete failed" };
  }
};

/* -------------------- 📊 DASHBOARD -------------------- */

// Tutor dashboard → GET /tutor/dashboard
export const fetchTutorDashboard = async () => {
  try {
    const res = await tutorAxios().get("/tutor/dashboard");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to load dashboard" };
  }
};

/* -------------------- 🎥 CLASSES -------------------- */

// Schedule class → POST /tutor/classes/schedule
export const scheduleClass = async (data) => {
  try {
    const res = await tutorAxios().post("/tutor/classes/schedule", data);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Schedule failed" };
  }
};

// Fetch upcoming → GET /tutor/classes/upcoming
export const fetchUpcomingClasses = async () => {
  try {
    const res = await tutorAxios().get("/tutor/classes/upcoming");
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Load failed" };
  }
};

// COMPLETE class → POST /tutor/classes/{id}/complete
export const completeClass = async (id) => {
  try {
    const res = await tutorAxios().post(`/tutor/classes/${id}/complete`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Complete failed" };
  }
};

/* -------------------- 📂 MATERIALS -------------------- */

// Add material → POST /tutor/materials?courseId=&title=&url=
export const addMaterial = async (courseId, title, url) => {
  try {
    const res = await tutorAxios().post(
      `/tutor/materials?courseId=${courseId}&title=${title}&url=${url}`
    );
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Upload failed" };
  }
};

// Get materials → GET /tutor/materials?courseId=
export const getMaterials = async (courseId) => {
  try {
    const res = await tutorAxios().get(`/tutor/materials?courseId=${courseId}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to load materials" };
  }
};
