import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const UserPhoto = ({ userData }) => {
    const [imageExists, setImageExists] = useState(true);
    const photoURL = `http://localhost:8080/api/photos/${userData.username}.png`;

    const handleImageLoad = () => {
        setImageExists(true);
    };

    const handleImageError = () => {
        setImageExists(false);
    };

    return (
        <div className="child-page-container">
            <div className="child-image-container">
                {imageExists ? (
                    <img
                        src={photoURL}
                        alt={userData.username}
                        className="child-image"
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                    />
                ) : (
                    <img
                        src={`http://localhost:8080/api/photos/default.png`}
                        alt={userData.username}
                        className="child-image"
                    />
                )}
                <h2>{userData.username}</h2>
                <h5>{userData.email}</h5>
            </div>
        </div>
    );
};


export default UserPhoto;
