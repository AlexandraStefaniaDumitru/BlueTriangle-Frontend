import React from "react";
import { Link } from "react-router-dom";
import profileImage from "../../../assets/profile.png";
import searchImage from "../../../assets/search.png";
import logoutImage from "../../../assets/logout.png";
import childrenImage from "../../../assets/children.png";
import login from "../../../assets/login.png";
import signUp from "../../../assets/signUp.png";
import "./navbar.css";

const Navbar = ({ userData, setUserData }) => {
  const profile = `/profile/:${userData.username}`;
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/register">
          <img src={signUp} alt="Register" />
        </Link>
        <Link to="/login">
          <img src={login} alt="Login" />
        </Link>
        <Link to={profile}>
          <img src={profileImage} alt="Profile" />
        </Link>
        {userData.verified && (
          <Link to="/children">
            <img src={childrenImage} alt="Children" />
          </Link>
        )}
      </div>
      <div className="navbar-right">
        <Link to="/login">
          <img src={logoutImage} alt="Logout" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
