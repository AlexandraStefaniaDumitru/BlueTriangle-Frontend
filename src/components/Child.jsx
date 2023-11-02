import BookAppointment from "./BookAppointment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Map from "./map/Map";
import axios from "../api/axios";
import ChildPhoto from "./ChildPhoto";
import FavouriteActivities from "./FavouriteActivities";
import LandingPage from "./LandingPage";

import "./child.css";

const Child = ({ userData, setUserData }) => {
  if(Object.keys(userData).length === 0)
  return <LandingPage></LandingPage>;
  const [child, setChild] = useState({});
  const { name: childName } = useParams();

  useEffect(() => {
    const fetchChild = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/children/${childName}`
        );
        console.log(response.data);
        setChild(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChild();
  }, []);

  return (
    <>
      <Navbar userData={userData} setUserData={setUserData} />
      <div className="up-container">
        <div className="childBio">
          <ChildPhoto childName={childName} />
          <div className="description">{child.description}</div>
        </div>
        <div className="info-point">
          <FavouriteActivities activities={child.favoriteActivities} />
          <br></br>
          <br></br>
          <BookAppointment child={child} userdata={userData} />
        </div>
        <br></br>
        <br></br>
        <div className="map-child">
          <h4 className="mapTitle">Unde gasim copilul?</h4>
          <Map lat={child.lat} lng={child.lng} />
        </div>
        {/* descriere */}
      </div>
    </>
  );
};

export default Child;
