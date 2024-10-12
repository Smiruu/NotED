import React from 'react';
import { useNavigate } from "react-router-dom";
import './css/FolderCard.css'; // Import the CSS file


const FolderCard = ({ group }) => {
  const navigate = useNavigate(); 
  const handleClick = () => {
    // Navigate to the group's page based on group_tag
    navigate(`/groups/${group.group_tag}`);
  };
  
    return (
      <div className="folder-card" onClick={handleClick}>
        <div
          className="folder-card-header"
          style={{ backgroundImage: `url(${group.group_image})` }} // Set background image
        ></div>
        <div className="folder-card-body">
          <h2 className="group-name">{group.name}</h2>
        </div>
      </div>
    );
  };

export default FolderCard;