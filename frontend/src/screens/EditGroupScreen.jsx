import React, { useState } from "react";
import "./css/EditGroupScreen.css";
import NavigationBar from "../components/NavigationBar";

function EditGroupScreen() {
  const [groupName, setGroupName] = useState("Current Group Name");
  const [members, setMembers] = useState(["Member 1", "Member 2"]);

  const handleAddMember = () => {
    const newMember = prompt("Enter member's name:");
    if (newMember) {
      setMembers([...members, newMember]);
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    setMembers(members.filter((member) => member !== memberToRemove));
  };

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

        <div className="edit-group-members">
          <h3>Members</h3>
          <ul>
            {members.map((member, index) => (
              <li key={index}>
                {member}
                <button
                  onClick={() => handleRemoveMember(member)}
                  className="remove-button"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button onClick={handleDeleteGroup} className="delete-button">
          Delete Group
        </button>
      </div>
    </div>
  );
}

export default EditGroupScreen

