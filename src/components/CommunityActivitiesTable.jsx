import React from 'react';
import "./communityactivitiestable.css";
import axios from "axios";

const CommunityActivitiesTable = ({activities, currentUser, setActivities}) => {
    const handleJoinActivity = (activity, activityId) => {
        const resList = [activity.organizer.username, activity.date];
        axios.post(`http://localhost:8080/api/community-activities/join-activity/${currentUser.username}`, resList).then(data => {
            console.log('Success', data);
            // const updatedActivity = data.data;
            // updatedActivity(updatedActivity);
            const updatedActivities = activities.map(act => {
                if (act.id === activityId) {
                    return {
                        ...act,
                        adults: [...act.adults, currentUser] // Assuming currentUser is the new adult to add
                    };
                }
                return act;
            });
            setActivities(updatedActivities);
        }).catch(err => {
            console.log('Error', err);
        });
    };

    const isUserParticipating = (activity) => {
        return activity.adults.some(adult => adult.username === currentUser.username);
    };

    return (
        <table className="community-activities-table">
            <thead>
            <tr>
                <th>Descriere</th>
                <th>Data</th>
                <th>Durata</th>
                <th>Organizator</th>
                <th>Participanti</th>
                <th>Copii</th>
                <th>Actiuni</th>
            </tr>
            </thead>
            <tbody>
            {activities.map((activity, index) => (
                <tr key={index}>
                    <td>{activity.description}</td>
                    <td>{activity.date}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.organizer ? activity.organizer.username : 'N/A'}</td>
                    <td>{activity.adults && activity.adults.map(adult => adult.username).join(', ')}</td>
                    <td>{activity.children && activity.children.map(child => child.name).join(', ')}</td>
                    <td>
                        <button
                            onClick={() => handleJoinActivity(activity, activity.id)}
                            disabled={currentUser && (activity.organizer && currentUser.username === activity.organizer.username || isUserParticipating(activity))}
                        >
                            Alatura-te
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default CommunityActivitiesTable;
