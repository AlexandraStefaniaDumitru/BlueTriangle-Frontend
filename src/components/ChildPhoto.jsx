import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ChildPhoto = ({ childName }) => {
  const photoURL = `http://localhost:8080/api/photos/${childName}.png`;

  return (
    <div className="child-page-container">
      <div className="child-image-container">
        <img src={photoURL} alt={childName} className="child-image" />
        <h2>{childName}</h2>
      </div>
    </div>
  );
};

export default ChildPhoto;
