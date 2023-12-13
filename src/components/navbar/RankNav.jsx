import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RankNav.css";

const RankNav = ({score}) => {
    // Starea pentru nivelul de rank și informațiile aferente fiecărei categorii
    
    const [rankInfo, setRankInfo] = useState({
        novice: {
            label: "Novice",
            image: "/assets/helping-hand.png",
            description: "Ține-o tot așa! Ești un membru activ."
        },
        intermediate: {
            label: "Intermediate",
            image: "/assets/solidarity.png",
            description: "Ai un progres foarte bun! Ești aproape de rangul maxim."
        },
        advanced: {
            label: "Advanced",
            image: "/assets/love.png",
            description: "Felicitări, ai ajuns la nivelul maxim!"
        }
    });

    // Setează nivelul rank-ului în funcție de o anumită logică
    const determineRankLevel = (sc) => {
        console.log(sc)
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
    console.log(score)
    const currentRankLevel = determineRankLevel(score);

   
};

export default RankNav;
