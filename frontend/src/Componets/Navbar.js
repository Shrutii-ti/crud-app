import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TODO App</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link 
            to="/register" 
            className={location.pathname === "/register" ? "active" : ""}
          >
            Register
          </Link>
        </li>
        <li>
          <Link 
            to="/login" 
            className={location.pathname === "/login" ? "active" : ""}
          >
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

