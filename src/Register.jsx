import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  registerUser,
  verifyOtp,
  resendOtp,
} from "./authService";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

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

  // Hide Navbar
  useEffect(() => {
    document.body.classList.add("no-navbar");

    return () => {
      document.body.classList.remove("no-navbar");
    };
  }, []);

  // OTP Timer
  useEffect(() => {
    if (step !== "verify") return;

    if (timer <= 0) {
      setResendDisabled(false);
      return;
    }

    const countdown = setInterval(() => {
      setTimer((currentTimer) => {
        if (currentTimer <= 1) {
          clearInterval(countdown);
          setResendDisabled(false);
          return 0;
        }

        return currentTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, step]);

  // Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  // OTP Change
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setOtp(value);
  };

  // REGISTER
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const res = await registerUser(formData);

      const msg =
        res?.message ||
        "Registration successful! Please verify OTP.";

      setMessage(msg);

      // User already verified
      if (/already registered and verified/i.test(msg)) {
        setTimeout(() => {
          navigate("/login");
        }, 1200);

        return;
      }

      // Go to OTP verification
      setStep("verify");
      setOtp("");
      setTimer(60);
      setResendDisabled(true);
    } catch (err) {
      console.error("Registration error:", err);

      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Registration failed!";

      setMessage(msg);

      if (
        typeof msg === "string" &&
        /already registered and verified/i.test(msg)
      ) {
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setMessage("Please enter OTP.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await verifyOtp(
        formData.email,
        otp
      );

      const msg =
        res?.message ||
        "OTP verified successfully!";

      setMessage(msg);

      if (/success|verified/i.test(msg)) {
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      }
    } catch (err) {
      console.error(
        "OTP verification error:",
        err
      );

      setMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          "OTP verification failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  // RESEND OTP
  const handleResendOtp = async () => {
    if (!formData.email) {
      setMessage("Email is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await resendOtp(
        formData.email
      );

      setMessage(
        res?.message ||
          "OTP resent successfully!"
      );

      setOtp("");
      setTimer(60);
      setResendDisabled(true);
    } catch (err) {
      console.error(
        "Resend OTP error:",
        err
      );

      setMessage(
        err?.response?.data?.message ||
          err?.response?.data ||
          err?.message ||
          "Failed to resend OTP!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="register-card shadow-lg p-4 rounded-4">

          <h2 className="text-center mb-4 fw-bold text-gradient">
            {step === "register"
              ? "Create Your LearnMate Account"
              : "Verify Your Email"}
          </h2>

          {/* Message */}
          {message && (
            <div
              className={`alert text-center ${
                /success|otp sent|verify|verified/i.test(
                  String(message)
                )
                  ? "alert-success"
                  : "alert-danger"
              }`}
            >
              {message}

              {/already registered and verified/i.test(
                String(message)
              ) && (
                <div className="mt-2">

                  <Link
                    to="/login"
                    className="fw-semibold text-decoration-underline text-primary"
                  >
                    Go to Login
                  </Link>

                </div>
              )}
            </div>
          )}

          {/* REGISTER FORM */}

          {step === "register" && (
            <form onSubmit={handleSubmit}>

              {/* Name */}
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

              {/* Email */}
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

              {/* Password */}
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
                  name="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={6}
                  required
                />

                <span
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="password-toggle-icon"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "40px",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </span>

              </div>

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
                  <option value="STUDENT">
                    🎓 Student
                  </option>

                  <option value="TUTOR">
                    🧑‍🏫 Tutor
                  </option>

                  <option value="ADMIN">
                    👑 Admin
                  </option>
                </select>

              </div>

              {/* Register Button */}
              <div className="d-grid mt-4">

                <button
                  type="submit"
                  className="btn btn-light text-primary fw-bold py-2"
                  disabled={loading}
                >
                  {loading
                    ? "Registering..."
                    : "Register"}
                </button>

              </div>

            </form>
          )}

          {/* OTP VERIFICATION */}

          {step === "verify" && (
            <div className="text-center">

              <p className="text-light fw-semibold">
                Enter the OTP sent to{" "}
                <span className="text-warning">
                  {formData.email}
                </span>
              </p>

              <div className="mb-3">

                <input
                  type="text"
                  inputMode="numeric"
                  className="form-control text-center fw-bold fs-5"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={handleOtpChange}
                  maxLength={6}
                  required
                />

              </div>

              {/* Verify OTP */}
              <div className="d-grid mt-3">

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="btn btn-success fw-bold py-2"
                  disabled={
                    loading ||
                    otp.length === 0
                  }
                >
                  {loading
                    ? "Verifying..."
                    : "Verify OTP"}
                </button>

              </div>

              {/* Resend */}
              <p className="text-light mt-3">

                Didn&apos;t get OTP?{" "}

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={
                    resendDisabled ||
                    loading
                  }
                  className="btn btn-link text-warning fw-semibold p-0"
                >
                  Resend
                </button>

              </p>

              {resendDisabled && (
                <p className="text-light">
                  You can resend OTP in{" "}
                  <span className="fw-bold">
                    {timer}s
                  </span>
                </p>
              )}

              {!resendDisabled && (
                <p className="text-success fw-semibold">
                  You can resend OTP now.
                </p>
              )}

            </div>
          )}

          {/* LOGIN LINK */}

          {step === "register" && (
            <p className="text-center mt-4 text-light">

              Already have an account?{" "}

              <Link
                to="/login"
                className="text-warning fw-semibold text-decoration-none"
              >
                Login here
              </Link>

            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Register;