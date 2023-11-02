import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="landing-page">
      <div className="landing-section">
        <h1>ActionForTomorrow</h1>
        <p>Unlocking Potential, Nurturing Bright Futures:</p>
        <p>Empowering Children for a Better Tomorrow</p>
        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
