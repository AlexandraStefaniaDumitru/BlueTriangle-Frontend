import React, {useState} from "react";
import {Link} from "react-router-dom";
import logoutImage from "../../../assets/logout.png";
import verifyUser from "../../../assets/verify_user.png";
import verifyActivity from "../../../assets/verify_activity.png";
import giveFeedback from "../../../assets/give_feedback.png";
import "./navbar.css";
import "./RankNav";
import {Tooltip} from '@mui/material';

const NavbarAdmin = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Tooltip title="Verifica utilizatori">
                    <Link to="/verify-user">
                        <img src={verifyUser} alt="Register"/>
                    </Link>
                </Tooltip>
                <Tooltip title="Verifica activitati">
                    <Link to="/verify-activity">
                        <img src={verifyActivity} alt="Register"/>
                    </Link>
                </Tooltip>
                <Tooltip title="Ofera feedback">
                    <Link to="/give-feedback">
                        <img src={giveFeedback} alt="Register"/>
                    </Link>
                </Tooltip>
            </div>
            <div className="navbar-right">
                <Tooltip title="Deconecteaza-te">
                    <Link to="/login">
                        <img src={logoutImage} alt="Logout"/>
                    </Link>
                </Tooltip>

            </div>
        </nav>
    );
};

export default NavbarAdmin;
