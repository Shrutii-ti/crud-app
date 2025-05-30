import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-start">
    <div className="home-container">
      <h1>Welcome to TODO App</h1>
      <p>Organize your tasks efficiently. Get started now!</p>

      <div className="home-buttons">
        <Link to="/register">
          <button className="home-btn">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-btn">Login</button>
        </Link>
      </div>
    </div>
    </div>
  );
}

export default Home;


