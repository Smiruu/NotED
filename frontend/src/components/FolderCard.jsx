import React from 'react';
import './css/FolderCard.css'; // Import the CSS file

const FolderCard = ({ group }) => {
    return (
      <div className="folder-card">
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
