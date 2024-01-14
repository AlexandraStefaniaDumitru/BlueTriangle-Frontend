import React, { useEffect, useState } from "react";
import axios from "../api/axios.js";
import accept from "../../assets/accept.png";
import cancel from "../../assets/cancel.png";
import NavbarAdmin from "./navbar/NavbarAdmin.jsx";
import {Alert, CircularProgress, Snackbar} from "@mui/material";

const VERIFY_URL = "/api/users/verify";
const VerifyUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [denyMessage, setDenyMessage] = useState("");

    const getAllUsers = () => {
        console.log("Getting all users");
        axios
            .get(`http://localhost:8080/api/users`)
            .then((response) => {
                const filteredUsers = response.data.filter((item) => !item.verified);
                setUsers(filteredUsers);
                console.log(filteredUsers);
            })
            .catch((error) => {
                console.error("Error retrieving activities:", error);
            })
            .finally(() => {
                // Set loading to false when the data is loaded or an error occurs
                setLoading(false);
            });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleAccept = async (item) => {
        console.log("Accept clicked:", item);
        try {
            console.log(VERIFY_URL);
            const response = await axios.post(
                VERIFY_URL,
                JSON.stringify({
                    username: item.username,
                    password: item.password,
                }),
                {
                    headers: {"Content-Type": "application/json"},
                }
            );
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
        const updatedUsers = users.filter((user) => user.id !== item.id);
        setUsers(updatedUsers);
        setSuccessMessage("User successfully verified!");
    };

    const handleCancel = (item) => {
        console.log("Cancel clicked:", item);
        const updatedUsers = users.filter((user) => user.id !== item.id);
        setUsers(updatedUsers);
        setDenyMessage("User denied!");
    };

    const handleSnackbarClose = () => {
        setSuccessMessage("");
        setDenyMessage("");
    };

    return (
        <>
            <NavbarAdmin />
            <h1 className="tab-title">Verify users</h1>

            {loading ? (
                <div className="loading-container">
                    <CircularProgress />
                </div>
            ) : users.length > 0 ? (
                <table className="table-container">
                    <thead>
                    <tr>
                        <th>Nume</th>
                        <th>Email</th>
                        <th>Descriere</th>
                        <th>Birthdate</th>
                        <th>Verify</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((item) => (
                        <tr key={item.id}>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.description}</td>
                            <td>{item.birthdate}</td>
                            <td>
                                <img
                                    src={accept}
                                    alt="Accept"
                                    onClick={() => handleAccept(item)}
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
                    </tbody>
                </table>
            ) : (
                <h5 className="tab-empty-list">No users to verify.</h5>
            )}
            <Snackbar
                open={!!successMessage || !!denyMessage}
                autoHideDuration={2500} 
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

export default VerifyUser;
