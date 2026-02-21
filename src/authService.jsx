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
   🧩 INTERNAL — TOKEN BASED AXIOS FOR TUTOR + ADMIN
========================================================= */

const privateApi = () => {
  const token = localStorage.getItem("token");
  return axiosInstance.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};


export const getTutorDashboard = async () => {
  const res = await privateApi().get("/tutor/dashboard");
  return res.data;
};

export const getTutorCourses = async () => {

  const res = await privateApi().get("/tutor/courses");

  return res.data;

};



// ✅ CREATE COURSE

export const CreateTutorCourse = async (data) => {

  const res = await privateApi().post("/tutor/courses", data);

  return res.data;

};



// ✅ UPDATE COURSE

export const UdateTutorCourse = async (id, data) => {

  const res = await privateApi().put(`/tutor/courses/${id}`, data);

  return res.data;

};



// ✅ DELETE COURSE

export const deleteTutorCourse = async (id) => {

  const res = await privateApi().delete(`/tutor/courses/${id}`);

  return res.data;

};

/* -------------------- 🎥 LIVE CLASSES -------------------- */

// SCHEDULE Class
export const scheduleTutorClass = async (data) => {
  const res = await privateApi().post("/tutor/classes/schedule", data);
  return res.data;
};

// GET Upcoming Sessions
export const getUpcomingTutorClasses = async () => {
  const res = await privateApi().get("/tutor/classes/upcoming");
  return res.data;
};

// COMPLETE Class
export const completeTutorClass = async (sessionId) => {
  const res = await privateApi().post(`/tutor/classes/${sessionId}/complete`);
  return res.data;
};

// GET Class By Room ID
export const getClassByRoom = async (roomId) => {
  const res = await privateApi().get(`/tutor/classes/room/${roomId}`);
  return res.data;
};
export const startTutorClass = async (sessionId) => {

const res = await privateApi().post(

`/tutor/classes/${sessionId}/start`,

{}, // body

{

withCredentials: true

}

);

return res.data;

};


/* -------------------- 📂 MATERIALS -------------------- */

// ADD Material
export const addTutorMaterial = async (courseId, title, url) => {
  const res = await privateApi().post(
    `/tutor/materials?courseId=${courseId}&title=${title}&url=${url}`
  );
  return res.data;
};

// GET Materials
export const getTutorMaterials = async (courseId) => {
  const res = await privateApi().get(`/tutor/materials?courseId=${courseId}`);
  return res.data;
};

/* =========================================================
   🧩 ADMIN MODULE — MATCHES AdminController + AdminService
========================================================= */

// ADMIN Dashboard
export const fetchAdminStats = async () => {
  const res = await privateApi().get("/admin/dashboard");
  return res.data;
};

// Pending Tutors
export const fetchPendingTutors = async () => {
  const res = await privateApi().get("/admin/tutors/pending");
  return res.data;
};

// Approve Course
export const approveTutor = async (id) => {
  const res = await privateApi().put(`/admin/course/approve/${id}`);
  return res.data;
};

// Reject Course
export const rejectTutor = async (id) => {
  const res = await privateApi().put(`/admin/course/reject/${id}`);
  return res.data;
};
