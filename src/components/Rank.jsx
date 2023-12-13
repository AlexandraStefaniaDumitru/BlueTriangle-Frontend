import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Rank.css";

const Rank = ({score}) => {
    // Starea pentru nivelul de rank și informațiile aferente fiecărei categorii
    
    const [rankInfo, setRankInfo] = useState({
        novice: {
            label: "Avocatul Bunătății",
            image: "/assets/helping-hand.png",
            description: "Ține-o tot așa! Ești un membru activ."
        },
        intermediate: {
            label: "Ambasadorul Optimist",
            image: "/assets/solidarity.png",
            description: "Ai un progres foarte bun! Ești aproape de rangul maxim."
        },
        advanced: {
            label: "Gardianul Visurilor",
            image: "/assets/love.png",
            description: "Felicitări, ai ajuns la nivelul maxim!"
        }
    });

    // Setează nivelul rank-ului în funcție de o anumită logică
    const determineRankLevel = (sc) => {
        // Exemplu simplu: schimbă logica în funcție de scorul utilizatorului
        if (sc < 10) {
            return "novice";
        } else if (sc < 20) {
            return "intermediate";
        } else {
            return "advanced";
        }
    };

    // Obține nivelul curent de rank

    const currentRankLevel = determineRankLevel(score);

    return (
        <div className="rank-container">
            <p>Nivel {rankInfo[currentRankLevel].label}</p>
            <img className="rank-image" src={rankInfo[currentRankLevel].image} alt="Register" />
            <p>{rankInfo[currentRankLevel].description}</p>
        </div>
    );
};

export default Rank;
