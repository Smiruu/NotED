import React, { useState, useEffect } from "react"; // Import useEffect
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { uploadGroupImage, removeGroupImage,deleteGroup, getGroupDetails } from "../actions/groupActions"; // Import the necessary actions
import "./css/EditGroupScreen.css";
import NavigationBar from "../components/NavigationBar";

function EditGroupScreen() {
  const { group_tag } = useParams();
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const dispatch = useDispatch();
  
  // Fetch group details from the Redux store
  const groupDetailsState = useSelector((state) => state.groupDetails);
  const { group, loading, error } = groupDetailsState;

  useEffect(() => {
    // Dispatch the action to fetch group details when the component mounts
    dispatch(getGroupDetails(group_tag));
  }, [dispatch, group_tag]);

  useEffect(() => {
    if (group) {
      setGroupName(group.name); // Set the current group name
      setMembers(group.members || []); // Set the current members
      // You might want to set the current image here if available
    }
  }, [group]);

  const handleAddMember = () => {
    const newMember = prompt("Enter member's name:");
    if (newMember) {
      setMembers([...members, newMember]);
    }
  };

  const handleRemoveMember = (memberToRemove) => {
    setMembers(members.filter((member) => member !== memberToRemove));
  };

  const handleDeleteGroup = async () => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      dispatch(deleteGroup(group_tag)); // Dispatch the deleteGroup action
      alert("Group deleted!"); // Optionally notify the user
      navigate("/groups");
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      dispatch(uploadGroupImage(group_tag, selectedImage));
    } else {
      alert("Please select an image first.");
    }
  };

  const handleImageRemove = () => {
    if (window.confirm("Are you sure you want to remove this group image?")) {
      dispatch(removeGroupImage(group_tag));
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="edit-group-main">
      <NavigationBar />
      <div className="edit-group-contents">
        <div className="edit-group-photo">
          <h3>Edit Group Photo</h3>
          {group.group_image && <img src={group.group_image} alt="Group" className="group-image" />} {/* Display the current group image */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleImageUpload} className="edit-button">
            Upload Photo
          </button>
          <button onClick={handleImageRemove} className="remove-button">
            Remove Photo
          </button>
        </div>
  
        <div className="edit-group-members">
          <h3>Members</h3>
          <ul>
            {members.map((member, index) => (
              <li key={index}>
                {member.name} {/* Accessing the name property */}
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

export default EditGroupScreen;
