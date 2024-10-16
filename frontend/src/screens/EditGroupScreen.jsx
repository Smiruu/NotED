import React, { useState } from "react";
import "./css/EditGroupScreen.css";
import NavigationBar from "../components/NavigationBar";

function EditGroupScreen() {
  
  const handleDeleteGroup = () => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      // Logic to delete the group will be added by your partner
      alert("Group deleted!");
    }
  };

  return (
    <div className="edit-group-main">
      <NavigationBar />
      <div className="edit-group-contents">
        <div className="edit-group-photo">
          <h3>Edit Group Photo</h3>
          <input type="file" accept="image/*" />
          <button className="edit-button">Upload Photo</button>
        </div>

        <button onClick={handleDeleteGroup} className="delete-button">
          Delete Group
        </button>
      </div>
    </div>
  );
}

export default EditGroupScreen

