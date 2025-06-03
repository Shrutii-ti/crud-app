import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "../src/Componets/Navbar";
import Home from "../src/Pages/Home";
import Register from "../src/Pages/Register";
import Verify from "../src/Pages/Verify";
import Login from "../src/Pages/Login";
import ResetPassword from "../src/Pages/ResetPassword";
import Dashboard from "../src/Pages/DashBoard";
import { AuthProvider, useAuth } from "../src/Context/authContext"; // make sure path is correct

// Protected Route component
const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
