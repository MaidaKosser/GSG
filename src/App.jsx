import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";

export default function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

  // Listen for changes in localStorage (like after login)
  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("userRole"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />

      <Route
        path="/admin"
        element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/home"
        element={userRole ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}
