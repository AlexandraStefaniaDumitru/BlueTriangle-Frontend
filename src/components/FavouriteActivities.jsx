import React, { useState } from "react";
import "./FavouriteActivities.css"; // Importați fișierul CSS

function FavouriteActivities({ activities }) {
  const handleMouseEnter = (event) => {
    event.target.classList.add("hovered");
  };

  const handleMouseLeave = (event) => {
    event.target.classList.remove("hovered");
  };
  if (!activities) return <div>No activities</div>;
  return (
    <div className="fragment">
      <h1 className="heading">Activitati preferate:</h1>
      <ul>
        {activities.map((item, index) => (
          <li
            className="listItem"
            key={index}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="circle"></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavouriteActivities;
