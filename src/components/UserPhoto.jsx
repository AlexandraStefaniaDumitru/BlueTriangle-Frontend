import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserPhoto = ({ userData }) => {
  const photoURL = `http://localhost:8080/api/photos/${userData.username}.png`;

  return (
    <div className="child-page-container">
      <div className="child-image-container">
        <img src={photoURL} alt={userData.username} className="child-image" />
        <h2>{userData.username}</h2>
      </div>
    </div>
  );
};

export default UserPhoto;
