import React from "react";
import { jwtDecode } from "jwt-decode";


export default function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return window.location.href = "/login";
const payload = jwtDecode(token);

  if (role !== "ADMIN") return window.location.href = "/login";

  return children;
}
