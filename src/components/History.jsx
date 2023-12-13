import React from "react";
import "./History.css";
import { useNavigate } from "react-router-dom";

function History({data, communityData, userData}) {
    const navigate = useNavigate();
    const handleInviteAgain = (child) => {
        navigate(`/children/${child.name}`);
    };

    const handleInviteAgainCommunityActivity = (children) => {
        console.log(children);
        const childrenNames = children.map(child => child.name).join(',');
        navigate(`/community-activities/create/${userData.username}`, { state: { childrenNames } });
    };

    const formatChildrenNames = (children) => {
        return children.map(child => child.name).join(', ');
    };

    return (
        <table className="table-container">
            <thead>
            <tr>
                <th>Nume copil</th>
                <th>Data</th>
                <th>Durata</th>
                <th>Descriere</th>
                <th>Acțiuni</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id.timestamp}>
                    <td>{item.child && item.child.name}</td>
                    <td>{item.date}</td>
                    <td>{item.duration}</td>
                    <td>{item.description}</td>
                    <td>
                        <button
                            className="invite-button"
                            onClick={() => handleInviteAgain(item.child)}
                        >
                            Invita din nou
                        </button>
                    </td>
                </tr>
            ))}
            {communityData.map((item) => (
                <tr key={item.id.timestamp}>
                    <td>{formatChildrenNames(item.children)}</td>
                    <td>{item.date}</td>
                    <td>{item.duration}</td>
                    <td>{item.description}</td>
                    <td>
                        <button
                            className="invite-button"
                            onClick={() => handleInviteAgainCommunityActivity(item.children)}
                        >
                            Invita din nou
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default History;
