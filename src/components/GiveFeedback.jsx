import React, { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import accept from "../../assets/accept.png";
import NavbarAdmin from "./navbar/NavbarAdmin.jsx";
 
const GiveFeedback = () => {
  const [activities, setActivities] = useState([]);
  const [communityActivities, setCommunityActivities] = useState([]);
  const [newScores, setNewScores] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [error, setError] = useState("");
  const [loadingCommunityActivity, setLoadingCommunityActivity] =
    useState(true);
    const [flag, setFlag] = useState(false);
  const ACTIVITIES_URL = "/api/activities/feedback";
  const COMMUNITYACTIVITIES_URL = "api/community-activities/feedback";
  const [successMessage, setSuccessMessage] = useState("");
 
  const getAllActivities = () => {
    console.log("get all activities");
    axios
      .get(`http://localhost:8080/api/activities`)
      .then((response) => {
        // Filtrăm activitățile cu date viitoare și hasFeedback setat la false
        const filteredActivities = response.data.filter(
          (activity) =>
            new Date(activity.date) < new Date() && !activity.hasFeedback
        );
 
        setActivities(filteredActivities);
        console.log(filteredActivities);
      })
      .catch((error) => {
        console.error("Error retrieving activities:", error);
      })
      .finally(() => {
        // Set loading to false when the data is loaded or an error occurs
        setLoadingActivity(false);
      });
  };
 
  const getAllCommunityActivities = () => {
    console.log("get all activities");
    axios
      .get(
        `http://localhost:8080/api/community-activities/all-community-activities`
      )
      .then((response) => {
        // Filtrăm activitățile cu date viitoare
        const filteredActivities = response.data.filter(
          (activity) =>
            new Date(activity.date) < new Date() && !activity.hasFeedback
        );
 
        setCommunityActivities(filteredActivities);
        console.log(filteredActivities);
      })
      .catch((error) => {
        console.error("Error retrieving activities:", error);
      })
      .finally(() => {
        // Set loading to false when the data is loaded or an error occurs
        setLoadingCommunityActivity(false);
      });
  };
 
  useEffect(() => {
    getAllActivities();
    getAllCommunityActivities();
  }, []);
 
  const combinedActivities = [...activities, ...communityActivities];
 
  const handleAccept = (item, index) => {
    const newScore = newScores[index];
    if (newScore !== undefined) {
      if (Array.isArray(item.adults)) {
        updateCommunityActivityScore(item, newScore);
      } else if (typeof item.adult === "object") {
        updateActivityScore(item, newScore);
      } else {
        console.error("Invalid adult format:", item.adult);
      }
    } else {
      alert("Score is not defined. Please enter a valid score.");
    }
  };
 
  const updateActivityScore = async (item, score) => {
    try {
      const response = await axios.post(
        ACTIVITIES_URL,
        JSON.stringify({
          date: item.date,
          description: item.description,
          feedback: score,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFlag(true);
      setTimeout(() => setFlag(false), 3000);
    } catch (err) {
      console.log(err);
    }
 
    console.log("Activity updated successfully");
    getAllActivities();
    getAllCommunityActivities();
    const updatedActivities = activities.filter(
          (activity) =>
            new Date(activity.date) < new Date() && !activity.hasFeedback
        );
    setActivities(updatedActivities);
    const updatedCommunityActivities = communityActivities.filter(
        (activity) =>
          new Date(activity.date) < new Date() && !activity.hasFeedback
      );
    setCommunityActivities(updatedCommunityActivities);
    setSuccessMessage("Feedback successfully given!");
  };
 
  const updateCommunityActivityScore = async (item, score) => {
    try {
      const response = await axios.post(
        COMMUNITYACTIVITIES_URL,
        JSON.stringify({
          date: item.date,
          description: item.description,
          feedback: score,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setFlag(true);
      setTimeout(() => setFlag(false), 3000);
    } catch (err) {
      console.log(err);
    }
 
    console.log("Activity updated successfully");
    getAllActivities();
    getAllCommunityActivities();
    const updatedActivities = activities.filter(
        (activity) =>
          new Date(activity.date) < new Date() && !activity.hasFeedback
      );
  setActivities(updatedActivities);
  const updatedCommunityActivities = communityActivities.filter(
      (activity) =>
        new Date(activity.date) < new Date() && !activity.hasFeedback
    );
  setCommunityActivities(updatedCommunityActivities);
  setSuccessMessage("Feedback successfully given!");
  };
 
  return (
    <>
      <NavbarAdmin />
      <h1 className="tab-title">Give feedback</h1>
 
      {loadingActivity || loadingCommunityActivity ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <table className="table-container">
          <thead>
            <tr>
              <th>Adult</th>
              <th>Nume copil</th>
              <th>Data</th>
              <th>Description</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {combinedActivities.map((item, index) => (
              <tr key={item.id.timestamp}>
                <td>
                  {Array.isArray(item.adults) ? (
                    item.adults.map((adult, adultIndex) => (
                      <span key={adultIndex}>{adult.username} </span>
                    ))
                  ) : (
                    <span>{item.adult && item.adult.username}</span>
                  )}
                </td>
                <td>
                  {Array.isArray(item.children) ? (
                    item.children.map((child, childIndex) => (
                      <span key={childIndex}>{child.name} </span>
                    ))
                  ) : (
                    <span>{item.child && item.child.name}</span>
                  )}
                </td>
                <td>{item.date}</td>
                <td>{item.description}</td>
                <td style={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="number"
                    value={newScores[index] || ""}
                    onChange={(e) => {
                      const updatedScores = [...newScores];
                      updatedScores[index] = e.target.value;
                      setNewScores(updatedScores);
                    }}
                    style={{ marginLeft: "10px", marginRight: "5px" }}
                  />
                  <img
                    src={accept}
                    alt="Accept"
                    onClick={() => handleAccept(item, index)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default GiveFeedback;