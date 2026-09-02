import axiosInstance from "./axios";

// AUTH — REGISTER / LOGIN / OTP / PASSWORD

// REGISTER
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post(
      "/auth/register",
      userData
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Registration failed",
    };
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Login failed",
    };
  }
};

// VERIFY OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post(
      "/auth/verify-otp",
      {
        email,
        otp,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "OTP verification failed",
    };
  }
};

// RESEND OTP
export const resendOtp = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/auth/resend-otp",
      null,
      {
        params: {
          email,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Failed to resend OTP",
    };
  }
};

// FORGOT PASSWORD
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/auth/forgot-password",
      null,
      {
        params: {
          email,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Failed to send OTP",
    };
  }
};

// RESET PASSWORD
export const resetPassword = async (
  email,
  otp,
  newPassword
) => {
  try {
    const response = await axiosInstance.post(
      "/auth/reset-password",
      {
        email,
        otp,
        newPassword,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data || {
      message: "Password reset failed",
    };
  }
};


// TUTOR

export const getTutorDashboard = async () => {
  const res = await axiosInstance.get("/tutor/dashboard");
  return res.data;
};

export const getTutorCourses = async () => {
  const res = await axiosInstance.get("/tutor/courses");
  return res.data;
};

export const CreateTutorCourse = async (data) => {
  const res = await axiosInstance.post(
    "/tutor/courses",
    data
  );

  return res.data;
};

export const UdateTutorCourse = async (id, data) => {
  const res = await axiosInstance.put(
    `/tutor/courses/${id}`,
    data
  );

  return res.data;
};

export const deleteTutorCourse = async (id) => {
  const res = await axiosInstance.delete(
    `/tutor/courses/${id}`
  );

  return res.data;
};


// LIVE CLASSES

// SCHEDULE CLASS
export const scheduleTutorClass = async (data) => {
  const res = await axiosInstance.post(
    "/tutor/classes/schedule",
    data
  );

  return res.data;
};

// UPCOMING CLASSES
export const getUpcomingTutorClasses = async () => {
  const res = await axiosInstance.get(
    "/tutor/classes/upcoming"
  );

  return res.data;
};

// COMPLETE CLASS
export const completeTutorClass = async (sessionId) => {
  const res = await axiosInstance.post(
    `/tutor/classes/${sessionId}/complete`
  );

  return res.data;
};

// GET CLASS BY ROOM
export const getClassByRoom = async (roomId) => {
  const res = await axiosInstance.get(
    `/tutor/classes/room/${roomId}`
  );

  return res.data;
};

// START CLASS
export const startTutorClass = async (sessionId) => {
  const res = await axiosInstance.post(
    `/tutor/classes/${sessionId}/start`
  );

  return res.data;
};


// MATERIALS

// ADD MATERIAL
export const addTutorMaterial = async (
  courseId,
  title,
  url
) => {
  const res = await axiosInstance.post(
    "/tutor/materials",
    null,
    {
      params: {
        courseId,
        title,
        url,
      },
    }
  );

  return res.data;
};

// GET MATERIALS
export const getTutorMaterials = async (courseId) => {
  const res = await axiosInstance.get(
    "/tutor/materials",
    {
      params: {
        courseId,
      },
    }
  );

  return res.data;
};


// ADMIN

// ADMIN DASHBOARD
export const fetchAdminStats = async () => {
  const res = await axiosInstance.get(
    "/admin/dashboard"
  );

  return res.data;
};

// PENDING COURSES
export const fetchPendingCourses = async () => {
  const res = await axiosInstance.get(
    "/admin/courses/pending"
  );

  return res.data;
};

// APPROVE COURSE
export const approveCourse = async (id) => {
  const res = await axiosInstance.put(
    `/admin/course/approve/${id}`
  );

  return res.data;
};

// REJECT COURSE
export const rejectCourse = async (id) => {
  const res = await axiosInstance.put(
    `/admin/course/reject/${id}`
  );

  return res.data;
};

// ALL STUDENTS
export const getAllStudents = async () => {
  const res = await axiosInstance.get(
    "/admin/students"
  );

  return res.data;
};


// STUDENT

// DASHBOARD
export const fetchStudentDashboard = async () => {
  const res = await axiosInstance.get(
    "/student/dashboard"
  );

  return res.data;
};

// ALL COURSES
export const fetchAllCourses = async () => {
  const res = await axiosInstance.get(
    "/student/courses"
  );

  return res.data;
};

// ENROLL
export const enrollCourse = async (id) => {
  const res = await axiosInstance.post(
    `/student/enroll/${id}`
  );

  return res.data;
};

// MY COURSES
export const fetchMyCourses = async () => {
  const res = await axiosInstance.get(
    "/student/my-courses"
  );

  return res.data;
};

// MY CLASSES
export const fetchMyClasses = async () => {
  const res = await axiosInstance.get(
    "/student/classes"
  );

  return res.data;
};

// MATERIALS
export const fetchMaterials = async (courseId) => {
  const res = await axiosInstance.get(
    `/student/materials/${courseId}`
  );

  return res.data;
};
export const askAiTutor = async (message) => {
  try {
    const response = await axiosInstance.post(
      "/student/ai/chat",
      {
        message,
      }
    );

    return response.data;
  } catch (error) {
    console.error("AI Tutor Error:", error);

    throw (
      error.response?.data || {
        message: "AI Tutor is currently unavailable",
      }
    );
  }
};