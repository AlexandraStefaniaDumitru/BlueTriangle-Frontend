import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Navbar from "./navbar/Navbar";
import LandingPage from "./LandingPage";

const CHILDREN_URL = "/api/children";

function TitlebarBelowImageList({ childrenData }) {
  const navigate = useNavigate();

  const handleChildClick = (childName) => {
    navigate(`/children/${childName}`);
  };

  return (
    <div className="image-list-container">
      <ImageList sx={{ width: "100%", height: "100%" }} cols={4}>
        {childrenData.map((child) => (
          <div key={child.photoURI} className="image-box">
            <Link to={`/children/${child.name}`}>
              <ImageListItem className="custom-image-list-item">
                <img
                  src={`http://localhost:8080/api/photos/${child.name}.png`}
                  alt={child.name}
                  loading="lazy"
                  className="custom-image"
                  onClick={() => handleChildClick(child.name)}
                />
              </ImageListItem>
            </Link>
            <div className="image-text-box">
              <p>
                <strong>{child.name}</strong>
              </p>
              <p>{child.birthdate}</p>
              <p>{child.description}</p>
            </div>
          </div>
        ))}
      </ImageList>
    </div>
  );
}

const Children = ({ userData, setUserData }) => {
  if (Object.keys(userData).length === 0) return <LandingPage></LandingPage>;

  const [childrenData, setChildrenData] = useState([]);

  useEffect(() => {
    const fetchChildrenData = async () => {
      try {
        const response = await axios.get(CHILDREN_URL);
        const children = response.data;
        setChildrenData(children);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChildrenData();
  }, []);

  return (
    <>
      <Navbar userData={userData} setUserData={setUserData} />
      <div className="children">
        <h1>Copii carora le poti schimba viitorul</h1>
        <TitlebarBelowImageList childrenData={childrenData} />
      </div>
    </>
  );
};

export default Children;
