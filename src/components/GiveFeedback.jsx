import React, { useState, useEffect } from "react";
import axios from "../api/axios.js";
import { CircularProgress, Snackbar, Alert } from "@mui/material";
import accept from "../../assets/accept.png";
import NavbarAdmin from "./navbar/NavbarAdmin.jsx";
import cancel from "../../assets/cancel.png";
let VERIFY_URL = "";
const GiveFeedback = () => {
  const [activities, setActivities] = useState([]);
  const [communityActivities, setCommunityActivities] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [loadingCommunity, setLoadingCommunity] = useState(true);
  const [newScoresActivities, setNewScoresActivities] = useState([]);
  const [newScoresCommunity, setNewScoresCommunity] = useState([]);

  const [successMessage, setSuccessMessage] = useState("");
  const [denyMessage, setDenyMessage] = useState("");

  const getAllActivities = () => {
      console.log("Getting all activities");
      axios
          .get(`http://localhost:8080/api/activities`)
          .then((response) => {
            const currentDate = Date.now();
          
            const filteredActivities = response.data.filter((item) => {
              const activityDate = new Date(item.date).getTime();
              return activityDate < currentDate && !item.hasFeedback;
            });
          
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
      console.log("Getting all community activities");
      axios
          .get(`http://localhost:8080/api/community-activities/all-community-activities`)
          .then((response) => {
            const currentDate = Date.now();
          
            const filteredCommunityActivities = response.data.filter((item) => {
              const activityDate = new Date(item.date).getTime();
              return activityDate < currentDate && !item.hasFeedback;
            });
          
            setCommunityActivities(filteredCommunityActivities);
            console.log(filteredCommunityActivities);
          })
          
          .catch((error) => {
              console.error("Error retrieving activities:", error);
          })
          .finally(() => {
              // Set loading to false when the data is loaded or an error occurs
              setLoadingCommunity(false);
          });
  };

  useEffect(() => {
      getAllActivities();
      getAllCommunityActivities();
  }, []);

  const handleAccept = async (item, type,score) => {
      console.log("Accept clicked:", item, type,score);
      try {
          if (type === 0) {
              VERIFY_URL = "/api/activities/feedback"
          } else {
              VERIFY_URL = "/api/community-activities/feedback"
          }
          console.log(VERIFY_URL);
          const response = await axios.post(
            VERIFY_URL,
            JSON.stringify({
              date: item.date,
              description: item.description,
              feedback: score,
            }),
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log(response.data);
      } catch (err) {
          console.log(err);
      }
      const updatedActivities = activities.filter((user) => user.id !== item.id);
      const updatedCommunity = communityActivities.filter((user) => user.id !== item.id);
      setActivities(updatedActivities);
      setCommunityActivities(updatedCommunity);
      setSuccessMessage("Feedback successfully given!");
      setDenyMessage("");
  };

  
  const handleSnackbarClose = () => {
      setDenyMessage("");
      setSuccessMessage("");
  };
  
  return (
      <>
          <NavbarAdmin />
          <h1 className="tab-title">Give feedback</h1>

          {loadingActivity !== false || loadingCommunity !== false ? (
              <div className="loading-container">
                  <CircularProgress />
              </div>
          ) : activities.length > 0 || communityActivities.length > 0 ? (
              <table className="table-container">
                  <thead>
                  <tr>
                      <th>Organizator</th>
                      <th>Nume copil</th>
                      <th>Descriere</th>
                      <th>Data</th>
                      <th>Feedback</th>
                  </tr>
                  </thead>
                  <tbody>
                  {activities.map((item,index) => (
                      <tr key={item.id}>
                          <td>{item.adult.username}</td>
                          <td>{item.child.name}</td>
                          <td>{item.description}</td>
                          <td>{item.date}</td>
                          <td>
  <div style={{ display: 'flex', alignItems: 'center', paddingLeft: "30px" }}>
    <input
      type="number"
      value={newScoresActivities[index] || ""}
      onChange={(e) => {
        const updatedScores = [...newScoresActivities];
        updatedScores[index] = e.target.value;
        setNewScoresActivities(updatedScores);
      }}
      style={{ marginRight: "-50px" }}
    />
    <img
      src={accept}
      alt="Accept"
      onClick={() => handleAccept(item, 0, newScoresActivities[index])}
      style={{ cursor: "pointer", marginLeft: "auto" }}
    />
  </div>
</td>



                      </tr>
                  ))}
                  {communityActivities.map((item,index) => (
                      <tr key={item.id}>
                          <td>{item.organizer.username}</td>
                          <td>
  {Array.isArray(item.children) ? (
    item.children.map((child, childIndex) => (
      <span key={childIndex}>{child.name} </span>
    ))
  ) : (
    <span>{item.child && item.child.name}</span>
  )}
</td>

                          <td>{item.description}</td>
                          <td>{item.date}</td>
                          <td>
             <div style={{ display: 'flex', alignItems: 'center', paddingLeft: "30px" }}>
              <input
                type="number"
                value={newScoresCommunity[index] || ""}
                onChange={(e) => {
                  const updatedScores = [...newScoresCommunity];
                  updatedScores[index] = e.target.value;
                  setNewScoresCommunity(updatedScores);
                }}
                style={{ marginRight: "-50px" }}
              />
                
              <img
                src={accept}
                alt="Accept"
                onClick={() => handleAccept(item, 1, newScoresCommunity[index])}
                style={{ cursor: "pointer", marginLeft: "auto" }}
              />
              </div>
            </td>
                      </tr>
                  ))}
                  </tbody>
              </table>
          ) : (
              <h5 className="tab-empty-list">No activities to give feedback to.</h5>
          )}
          <Snackbar
              open={!!successMessage || !!denyMessage}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
              { successMessage ? (
                  <Alert
                      severity="success"
                      sx={{ width: "100%" }}
                  >
                      {successMessage}
                  </Alert>
              ) : (
                  <Alert
                      severity="error"
                      sx={{ width: "100%" }}
                  >
                      {denyMessage}
                  </Alert>
              )}
          </Snackbar>
      </>
  );
};
export default GiveFeedback;