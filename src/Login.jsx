import React, { useState, useEffect } from "react";
import {
  loginUser,
  forgotPassword,
  resendOtp,
  resetPassword,
} from "./authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Hide Navbar on Login Page
  useEffect(() => {
    document.body.classList.add("no-navbar");
    return () => {
      document.body.classList.remove("no-navbar");
    };
  }, []);

  // LOGIN HANDLER
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await loginUser(email, password);

      if (res.token) {
        localStorage.setItem("token", res.token);

        const payload = JSON.parse(atob(res.token.split(".")[1]));

localStorage.setItem("userName", payload.sub);
        let userRole = payload.role?.replace("ROLE_", "").toUpperCase();

        setMessage("Login successful!");

        setTimeout(() => {
          if (userRole === "ADMIN") window.location.href = "/admin";
          else if (userRole === "TUTOR") window.location.href = "/tutor";
          else window.location.href = "/student-dashboard";
        }, 1000);
      } else {
        setMessage(res.message || "Login failed!");
      }
    } catch (err) {
      setMessage("Login failed! Check your credentials.");
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
      setMessage(res.message);
      setStep("reset");
    } catch (err) {
      setMessage("Error sending OTP");
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
      const res = await resetPassword(email, otp, newPassword);
      setMessage(res.message);
      if (res.message.toLowerCase().includes("successful")) {
        setTimeout(() => setStep("login"), 1500);
      }
    } catch (err) {
      setMessage("Password reset failed!");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await resendOtp(email);
      setMessage(res.message);
    } catch (err) {
      setMessage("OTP resend failed!");
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (step) {
      case "forgot":
        return (
          <>
            <h2 className="text-gradient text-center mb-3">Forgot Password</h2>
            <form onSubmit={handleForgot}>
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-light w-100 fw-bold text-primary">
                {loading ? "Sending..." : "Send OTP"}
              </button>

              <p className="text-center mt-3 text-light">
                Remembered?{" "}
                <span
                  className="text-warning fw-semibold pointer"
                  onClick={() => setStep("login")}
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
            <h2 className="text-gradient text-center mb-3">Reset Password</h2>
            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light fw-semibold">OTP</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label text-light fw-semibold">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <button type="submit" className="btn btn-light w-100 fw-bold text-primary">
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={handleResendOtp}
                className="btn btn-outline-light w-100 mt-2 fw-semibold"
              >
                Resend OTP
              </button>

              <p className="text-center mt-3 text-light">
                Back to{" "}
                <span
                  className="text-warning fw-semibold pointer"
                  onClick={() => setStep("login")}
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
            <h2 className="text-gradient text-center mb-3">Welcome Back 👋</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3 position-relative">
                <label className="form-label text-light fw-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="text-end mb-3">
                <span
                  className="text-warning fw-semibold pointer"
                  onClick={() => setStep("forgot")}
                >
                  Forgot Password?
                </span>
              </div>

              <button type="submit" className="btn btn-light w-100 fw-bold text-primary">
                {loading ? "Logging..." : "Login"}
              </button>
            </form>

            <p className="text-center mt-4 text-light">
              Don't have an account?{" "}
              <a href="/register" className="text-warning fw-semibold">
                Register here
              </a>
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
                message.toLowerCase().includes("success")
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
