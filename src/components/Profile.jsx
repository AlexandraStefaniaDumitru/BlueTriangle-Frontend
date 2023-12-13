import BookAppointment from "./BookAppointment";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Navbar from "./navbar/Navbar";
import Map from "./map/Map";
import axios from "../api/axios";
import UserPhoto from "./UserPhoto";
import History from "./History";
import LandingPage from "./LandingPage";
import Rank from "./Rank";

import "./profile.css";

const Profile = ({ userData, setUserData }) => {
  if (Object.keys(userData).length === 0) return <LandingPage></LandingPage>;
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

    const [communityActivities, setCommunityActivities] = useState([]);
    const getAllCommunityActivities = () => {
        axios.get(`http://localhost:8080/api/community-activities/all-community-activities/${userData.username}`)
            .then((response) => {
                setCommunityActivities(response.data);
                console.log("communityActivities", response.data);
            })
            .catch((error) => {
                console.error("Error retrieving community activities:", error)
            });
    };
    useEffect(() => {
        getAllCommunityActivities();
    }, [userData]);

  const handleVerify = () => {
    window.open("https://forms.gle/txozndKyXwL9o9TU9", "_blank");
  };

  return (
    <>
      <Navbar
        score={userData.score}
        userData={userData}
        setUserData={setUserData}
      />
      <div className="profile-container">
        <UserPhoto userData={userData} />
        <Rank score={userData.score}></Rank>
        <Map lat={userData.lat} lng={userData.lng} />
      </div>
      {!userData.verified && (
        <button type="button" className="eval-button" onClick={handleVerify}>
          Verify
        </button>
      )}

            <History data={activities} communityData={communityActivities} userData={userData}/>
        </>
    );
};

export default Profile;
