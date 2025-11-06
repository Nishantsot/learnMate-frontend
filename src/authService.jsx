import axiosInstance from "./axios";

// ✅ REGISTER USER
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// ✅ LOGIN USER
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

// ✅ VERIFY OTP
export const verifyOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/auth/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "OTP verification failed" };
  }
};

// ✅ RESEND OTP
export const resendOtp = async (email) => {
  try {
    const response = await axiosInstance.post(`/auth/resend-otp?email=${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to resend OTP" };
  }
};

// ✅ FORGOT PASSWORD
export const forgotPassword = async (email) => {
  try {
    const response = await axiosInstance.post(`/auth/forgot-password?email=${email}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to send password reset OTP" };
  }
};

// ✅ FIXED RESET PASSWORD
export const resetPassword = async (email, otp, newPassword) => {
  try {
    // 🔥 send JSON body, not query params
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
