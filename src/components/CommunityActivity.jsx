import {useState, useEffect} from "react";
import Navbar from "./navbar/Navbar";
import Map from "./map/Map";
import axios from "../api/axios";
import UserPhoto from "./UserPhoto";
import LandingPage from "./LandingPage";

import "./profile.css";
import CommunityActivitiesTable from "./CommunityActivitiesTable.jsx";

const CommunityActivity = ({userData, setUserData}) => {
    if (Object.keys(userData).length === 0)
        return <LandingPage/>;

    const [communityActivities, setCommunityActivities] = useState([]);
    const getAllCommunityActivities = () => {
        axios.get(`http://localhost:8080/api/community-activities/all-community-activities`)
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

    return (
        <>
            <Navbar userData={userData} setUserData={setUserData}/>
            <div className="profile-container">
                <UserPhoto userData={userData}/>
                <Map lat={userData.lat} lng={userData.lng}/>
            </div>
            {!userData.verified && (
                <button type="button" className="eval-button" onClick={handleVerify}>
                    Verify
                </button>
            )}

            <CommunityActivitiesTable activities={communityActivities} currentUser={userData} setActivities={setCommunityActivities}/>
        </>
    );
}

export default CommunityActivity;
