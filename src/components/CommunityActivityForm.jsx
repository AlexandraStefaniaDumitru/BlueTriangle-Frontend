import React, {useEffect, useState} from 'react';
import axios from "axios";
import Navbar from "./navbar/Navbar.jsx";
import UserPhoto from "./UserPhoto.jsx";
import Map from "./map/Map.jsx";
import './CommunityActivityForm.css';
import {useLocation} from "react-router-dom";

const CommunityActivityForm = ({onSubmit, userData, setUserData}) => {
    const location = useLocation();
    const [activity, setActivity] = useState({
        description: '',
        date: '',
        duration: '',
        organizer: userData.username || '',
        adults: '',
        children: ''
    });
    useEffect(() => {
        // Check if childrenNames is passed and update the state
        if (location.state && location.state.childrenNames) {
            setActivity(prevState => ({
                ...prevState,
                children: location.state.childrenNames
            }));
        }
    }, [location.state]);
    const [successMessage, setSuccessMessage] = useState('');

    const [validDuration, setValidDuration] = useState("valid");
    const [duration, setDuration] = useState("0");

    const handleChange = (e) => {
        if (e.target.name === 'adults') {
            const adultsArray = e.target.value.split(',').map(s => s.trim());
            setActivity({...activity, adults: adultsArray});
        } else if (e.target.name === 'children') {
            const childrenArray = e.target.value.split(',').map(s => s.trim());
            setActivity({...activity, children: childrenArray});
        } else {
            setActivity({...activity, [e.target.name]: e.target.value});
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(activity);
        axios.post('http://localhost:8080/api/community-activities', activity)
            .then(response => {
                console.log('Activity saved', response.data);
                setSuccessMessage("Activitate in comun inregistrata cu succes!");
                setActivity({
                    description: '',
                    date: '',
                    duration: '',
                    organizer: '',
                    adults: '',
                    children: ''
                });
            })
            .catch(error => {
                console.error('There was an error saving the activity', error);
                setSuccessMessage('Error');
            });
    };

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
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-field">
                    <label>Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={activity.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label>Date:</label>
                    <input
                        type="text"
                        name="date"
                        value={activity.date}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group flex-nowrap">
          <span className="formStyling" htmlFor="duration">
            Durata:{" "}
          </span>
                    <select
                        id="duration"
                        onChange={(e) => {
                            setDuration(e.target.value);
                            setActivity({...activity, duration: e.target.value});
                        }}
                        className="form-field"
                        aria-label="duration"
                        aria-describedby="addon-wrapping"
                    >
                        <option selected style={{ display: "none" }}>
                            Durata activitatii
                        </option>
                        <option value={1}>1h</option>
                        <option value={2}>2h</option>
                        <option value={3}>3h</option>
                        <option value={4}>4h</option>
                        <option value={5}>5h</option>
                        <option value={6}>6h</option>
                        <option value={7}>7h</option>
                        <option value={8}>8h</option>
                        <option value={9}>9h</option>
                        <option value={10}>10h</option>
                    </select>
                </div>
                <div className="form-field">
                    <label>Organizer:</label>
                    <input
                        type="text"
                        name="organizer"
                        value={activity.organizer}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label>Adults:</label>
                    <input
                        type="text"
                        name="adults"
                        value={activity.adults}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <label>Children:</label>
                    <input
                        type="text"
                        name="children"
                        value={activity.children}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="submit-button">Create Activity</button>
            </form>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </>
    );
};

export default CommunityActivityForm;
