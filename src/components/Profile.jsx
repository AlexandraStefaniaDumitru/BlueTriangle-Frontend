import BookAppointment from "./BookAppointment";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Map from "./map/Map";
import axios from "../api/axios";
import UserPhoto from "./UserPhoto";
import History from "./History";
import LandingPage from "./LandingPage";

import "./profile.css";

const Profile = ({ userData, setUserData }) => {
  if(Object.keys(userData).length === 0)
  return <LandingPage></LandingPage>;
  const [activities, setActivities] = useState([]);

  const getAllActivities = () => {
    console.log("get all");
    axios
      .get(`http://localhost:8080/api/activities/${userData.username}`)
      .then((response) => {
        setActivities(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving activities:", error);
      });
  };
  useEffect(() => {
    getAllActivities();
  }, [userData]);

  const handleVerify = () => {
    window.open("https://forms.gle/txozndKyXwL9o9TU9", "_blank");
  };
  return (
    <>
      <Navbar userData={userData} setUserData={setUserData} />
      <div className="profile-container">
        <UserPhoto userData={userData} />
        <Map lat={userData.lat} lng={userData.lng} />
      </div>
      {!userData.verified && (
        <button type="button" className="eval-button" onClick={handleVerify}>
          Verify
        </button>
      )}

      <History data={activities} />
    </>
  );
};

export default Profile;
