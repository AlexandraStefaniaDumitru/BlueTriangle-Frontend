import "./AdminPages.css";
import NavbarAdmin from "./navbar/NavbarAdmin.jsx";
import React, {useEffect, useState} from "react";
import axios from "../api/axios.js";
import {Alert, CircularProgress, Snackbar} from "@mui/material";
import accept from "../../assets/accept.png";
import cancel from "../../assets/cancel.png";

let VERIFY_URL = "";
const VerifyActivity = () => {

    const [activities, setActivities] = useState([]);
    const [communityActivities, setCommunityActivities] = useState([]);
    const [loadingActivity, setLoadingActivity] = useState(true);
    const [loadingCommunity, setLoadingCommunity] = useState(true);
    
    const [successMessage, setSuccessMessage] = useState("");
    const [denyMessage, setDenyMessage] = useState("");

    const getAllActivities = () => {
        console.log("Getting all activities");
        axios
            .get(`http://localhost:8080/api/activities`)
            .then((response) => {
                const filteredActivities = response.data.filter((item) => !item.verified);
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
                const filteredActivities = response.data.filter((item) => !item.verified);
                setCommunityActivities(filteredActivities);
                console.log(filteredActivities);
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

    const handleAccept = async (item, type) => {
        console.log("Accept clicked:", item, type);
        try {
            if (type === 0) {
                VERIFY_URL = "/api/activities/verify"
            } else {
                VERIFY_URL = "/api/community-activities/verify"
            }
            console.log(VERIFY_URL);
            const response = await axios.post(
                VERIFY_URL,
                JSON.stringify({
                    description: item.description,
                    date: item.date,
                }),
                {
                    headers: {"Content-Type": "application/json"},
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
        setSuccessMessage("Activity successfully verified!");
        setDenyMessage("");
    };

    const handleCancel = async (item, type) => {
        console.log("Cancel clicked:", item);
        try {
            if (type === 0) {
                VERIFY_URL = "/api/activities/verify-false"
            } else {
                VERIFY_URL = "/api/community-activities/verify-false"
            }
            console.log(VERIFY_URL);
            const response = await axios.post(
                VERIFY_URL,
                JSON.stringify({
                    description: item.description,
                    date: item.date,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
        const updatedActivities = activities.filter((activity) => activity.id !== item.id);
        setActivities(updatedActivities);
        setDenyMessage("Activity denied!");
        setSuccessMessage("");
    };

    const handleSnackbarClose = () => {
        setDenyMessage("");
        setSuccessMessage("");
    };
    
    return (
        <>
            <NavbarAdmin />
            <h1 className="tab-title">Verifica activitati</h1>

            {loadingActivity !== false || loadingCommunity !== false ? (
                <div className="loading-container">
                    <CircularProgress />
                </div>
            ) : activities.length > 0 || communityActivities.length > 0 ? (
                <table className="table-container">
                    <thead>
                    <tr>
                        <th>Organizator</th>
                        <th>Descriere</th>
                        <th>Durata (ore)</th>
                        <th>Data</th>
                        <th>Verify</th>
                    </tr>
                    </thead>
                    <tbody>
                    {activities.map((item) => (
                        <tr key={item.id}>
                            <td>{item.adult.username}</td>
                            <td>{item.description}</td>
                            <td>{item.duration}</td>
                            <td>{item.date}</td>
                            <td>
                                <img
                                    src={accept}
                                    alt="Accept"
                                    onClick={() => handleAccept(item, 0)}
                                    style={{ cursor: "pointer" }}
                                />
                                <img
                                    src={cancel}
                                    alt="Cancel"
                                    onClick={() => handleCancel(item)}
                                    style={{ cursor: "pointer" }}
                                />
                            </td>
                        </tr>
                    ))}
                    {communityActivities.map((item) => (
                        <tr key={item.id}>
                            <td>{item.organizer.username}</td>
                            <td>{item.description}</td>
                            <td>{item.duration}</td>
                            <td>{item.date}</td>
                            <td>
                                <img
                                    src={accept}
                                    alt="Accept"
                                    onClick={() => handleAccept(item, 1)}
                                    style={{ cursor: "pointer" }}
                                />
                                <img
                                    src={cancel}
                                    alt="Cancel"
                                    onClick={() => handleCancel(item, 1)}
                                    style={{ cursor: "pointer" }}
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <h5 className="tab-empty-list">Toate activitatile au fost verificate.</h5>
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

export default VerifyActivity;
