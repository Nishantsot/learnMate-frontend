import React, { useState, useEffect } from "react";
import { registerUser, verifyOtp, resendOtp } from "./authService";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("register");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);
  const [resendDisabled, setResendDisabled] = useState(true);

  const [showPassword, setShowPassword] = useState(false);

  // 🔥 Hide Navbar on Register page
  useEffect(() => {
    document.body.classList.add("no-navbar");

    return () => {
      document.body.classList.remove("no-navbar");
    };
  }, []);

  // ⏳ Timer
  useEffect(() => {
    if (step === "verify" && timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    } else if (timer === 0) {
      setResendDisabled(false);
    }
  }, [timer, step]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  // ✅ REGISTER SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await registerUser(formData);
      const msg = res.message || "Registration successful! Please verify OTP.";
      setMessage(msg);

      if (/already registered and verified/i.test(msg)) {
        setTimeout(() => (window.location.href = "/login"), 1500);
        return;
      }

      setStep("verify");
      setTimer(60);
      setResendDisabled(true);
    } catch (err) {
      const msg = err.message || "Registration failed!";
      setMessage(msg);
      if (/already registered and verified/i.test(msg)) {
        setTimeout(() => (window.location.href = "/login"), 1500);
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ VERIFY OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await verifyOtp(formData.email, otp);
      setMessage(res.message || "OTP verified successfully!");
      if (res.message.toLowerCase().includes("success")) {
        alert("✅ Account verified successfully! Please login.");
        window.location.href = "/login";
      }
    } catch (err) {
      setMessage(err.message || "OTP verification failed!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESEND OTP
  const handleResendOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await resendOtp(formData.email);
      setMessage(res.message || "OTP resent successfully!");
      setTimer(60);
      setResendDisabled(true);
    } catch (err) {
      setMessage(err.message || "Failed to resend OTP!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="register-card shadow-lg p-4 rounded-4">
          <h2 className="text-center mb-4 fw-bold text-gradient">
            {step === "register" ? "Create Your LearnMate Account" : "Verify Your Email"}
          </h2>

          {message && (
            <div
              className={`alert text-center ${
                /success|otp sent|verify/i.test(message)
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}
              {/already registered and verified/i.test(message) && (
                <div className="mt-2">
                  <a
                    href="/login"
                    className="fw-semibold text-decoration-underline text-primary"
                  >
                    Go to Login
                  </a>
                </div>
              )}
            </div>
          )}

          {/* 🔹 Register Form */}
          {step === "register" && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-light fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* 👁️ Password Field with Show/Hide */}
              <div className="mb-3 position-relative">
                <label className="form-label text-light fw-semibold">
                  Password
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
  setFormData({ ...formData, password: e.target.value })
}
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-icon"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "40px",
                    cursor: "pointer",
                    fontSize: "20px",
                    color: "#fff",
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {/* Role Dropdown */}
              <div className="mb-3">
                <label className="form-label text-light fw-semibold">
                  Select Role
                </label>
                <select
                  name="role"
                  className="form-select"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="STUDENT">🎓 Student</option>
                  <option value="TUTOR">🧑‍🏫 Tutor</option>
                  <option value="ADMIN">👑 Admin</option>
                </select>
              </div>

              <div className="d-grid mt-4">
                <button
                  type="submit"
                  className="btn btn-light text-primary fw-bold py-2"
                  disabled={loading}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          )}

          {/* 🔹 OTP Verification */}
          {step === "verify" && (
            <div className="text-center">
              <p className="text-light fw-semibold">
                Enter the OTP sent to{" "}
                <span className="text-warning">{formData.email}</span>
              </p>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control text-center fw-bold fs-5"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  required
                />
              </div>

              <div className="d-grid mt-3">
                <button
                  onClick={handleVerifyOtp}
                  className="btn btn-success fw-bold py-2"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>

              <p className="text-light mt-3">
                Didn’t get OTP?{" "}
                <button
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                  className="btn btn-link text-warning fw-semibold p-0"
                >
                  Resend
                </button>
              </p>

              <p className="text-light">
                You can resend OTP in <span className="fw-bold">{timer}s</span>
              </p>
            </div>
          )}

          {/* Footer */}
          {step === "register" && (
            <p className="text-center mt-4 text-light">
              Already have an account?{" "}
              <a href="/login" className="text-warning fw-semibold">
                Login here
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;