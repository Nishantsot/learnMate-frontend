import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  loginUser,
  forgotPassword,
  resendOtp,
  resetPassword,
} from "./authService";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Hide Navbar on Login Page


  // Decode JWT payload safely
  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];

      const base64 = base64Url
        .replace(/-/g, "+")
        .replace(/_/g, "/");

      const decodedPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(
            (char) =>
              "%" +
              ("00" + char.charCodeAt(0).toString(16)).slice(-2)
          )
          .join("")
      );

      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error("JWT decode error:", error);
      return null;
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await loginUser(email, password);

      if (!res?.token) {
        setMessage(res?.message || "Login failed!");
        return;
      }

      // Save token
      localStorage.setItem("token", res.token);

      const payload = decodeToken(res.token);

      if (!payload) {
        localStorage.removeItem("token");
        setMessage("Invalid login token.");
        return;
      }

      console.log("JWT Payload:", payload);

      // Save username/email from token
      if (payload.sub) {
        localStorage.setItem("userName", payload.sub);
      }

      // Extract role
      const userRole = payload.role
        ?.replace("ROLE_", "")
        .toUpperCase();

      if (userRole) {
        localStorage.setItem("role", userRole);
      }

      setMessage("Login successful!");

      setTimeout(() => {
        if (userRole === "ADMIN") {
          navigate("/admin");
        } else if (userRole === "TUTOR") {
          navigate("/tutor");
        } else if (userRole === "STUDENT") {
          navigate("/student");
        } else {
          navigate("/student");
        }
      }, 800);
    } catch (err) {
      console.error("Login error:", err);

      setMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Login failed! Check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  // FORGOT PASSWORD
  const handleForgot = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await forgotPassword(email);

      setMessage(res?.message || "OTP sent successfully.");
      setStep("reset");
    } catch (err) {
      console.error("Forgot password error:", err);

      setMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Error sending OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  // RESET PASSWORD
  const handleResetPassword = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await resetPassword(
        email,
        otp,
        newPassword
      );

      const responseMessage =
        res?.message || "Password reset successful.";

      setMessage(responseMessage);

      if (
        responseMessage
          .toLowerCase()
          .includes("success")
      ) {
        setPassword("");
        setOtp("");
        setNewPassword("");

        setTimeout(() => {
          setStep("login");
          setMessage(
            "Password reset successful. Please login."
          );
        }, 1200);
      }
    } catch (err) {
      console.error("Reset password error:", err);

      setMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          "Password reset failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await resendOtp(email);

      setMessage(
        res?.message || "OTP sent again successfully."
      );
    } catch (err) {
      console.error("Resend OTP error:", err);

      setMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          "OTP resend failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  // FORM
  const renderForm = () => {
    switch (step) {
      // FORGOT PASSWORD
      case "forgot":
        return (
          <>
            <h2 className="text-gradient text-center mb-3">
              Forgot Password
            </h2>

            <form onSubmit={handleForgot}>
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-light w-100 fw-bold text-primary"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send OTP"}
              </button>

              <p className="text-center mt-3 text-light">
                Remembered?{" "}
                <span
                  className="text-warning fw-semibold pointer"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setStep("login");
                    setMessage("");
                  }}
                >
                  Back to Login
                </span>
              </p>
            </form>
          </>
        );

      
      case "reset":
        return (
          <>
            <h2 className="text-gradient text-center mb-3">
              Reset Password
            </h2>

            <form
              onSubmit={handleResetPassword}
            >
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light fw-semibold">
                  OTP
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label text-light fw-semibold">
                  New Password
                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <span
                  className="position-absolute end-0 me-3 text-dark"
                  style={{
                    cursor: "pointer",
                    top: "42px",
                  }}
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-light w-100 fw-bold text-primary"
                disabled={loading}
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className="btn btn-outline-light w-100 mt-2 fw-semibold"
                disabled={loading}
              >
                Resend OTP
              </button>

              <p className="text-center mt-3 text-light">
                Back to{" "}
                <span
                  className="text-warning fw-semibold"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setStep("login");
                    setMessage("");
                  }}
                >
                  Login
                </span>
              </p>
            </form>
          </>
        );

   
      default:
        return (
          <>
            <h2 className="text-gradient text-center mb-3">
              Welcome Back 👋
            </h2>

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label text-light fw-semibold">
                  Password
                </label>

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                  required
                />

                <span
                  className="position-absolute end-0 me-3 text-dark"
                  style={{
                    cursor: "pointer",
                    top: "42px",
                  }}
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </span>
              </div>

              <div className="text-end mb-3">
                <span
                  className="text-warning fw-semibold"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setStep("forgot");
                    setMessage("");
                  }}
                >
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-light w-100 fw-bold text-primary"
                disabled={loading}
              >
                {loading
                  ? "Logging..."
                  : "Login"}
              </button>
            </form>

            <p className="text-center mt-4 text-light">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-warning fw-semibold text-decoration-none"
              >
                Register here
              </Link>
            </p>
          </>
        );
    }
  };

  return (
    <div className="login-page">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="login-card shadow-lg p-4 rounded-4">
          {message && (
            <div
              className={`alert ${
                message
                  .toLowerCase()
                  .includes("success")
                  ? "alert-success"
                  : "alert-danger"
              } text-center`}
            >
              {message}
            </div>
          )}

          {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default Login;