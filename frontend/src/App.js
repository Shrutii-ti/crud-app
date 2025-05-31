import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../src/Componets/Navbar";
import Home from "../src/Pages/Home";
import Register from "../src/Pages/Register";
import Verify from "../src/Pages/Verify";
import Login from "../src/Pages/Login";  // make sure the path casing matches your file structure

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />   {/* Added Login route */}
      </Routes>
    </Router>
  );
}

export default App;
