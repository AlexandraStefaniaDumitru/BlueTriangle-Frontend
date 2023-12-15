import {useState, useEffect} from "react";
import Navbar from "./navbar/Navbar";
import axios from "../api/axios";
import UserPhoto from "./UserPhoto";
import LandingPage from "./LandingPage";

import "./CommunityActivity.css";
import CommunityActivitiesTable from "./CommunityActivitiesTable.jsx";
import Rank from "./Rank.jsx";

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
            <div className="profile-rank-container">
                <div>
                    <UserPhoto userData={userData}/>
                    <div className="rank-container-table">
                        <Rank score={userData.score}></Rank>
                    </div>

                </div>
                <div>
                    <CommunityActivitiesTable activities={communityActivities} currentUser={userData}
                                              setActivities={setCommunityActivities}/>
                </div>
            </div>
        </>
    );
}

export default CommunityActivity;
