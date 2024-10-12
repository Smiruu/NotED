import React, { useState, useEffect } from "react";
import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  leaveGroup,
  deleteGroup,
  getGroupDetails,
} from "../actions/groupActions";
import { useParams, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import "./css/GroupViewScreen.css";

const GroupViewScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { group_tag } = useParams(); // Get group_tag from URL

  const groupDetails = useSelector((state) => state.groupDetails);
  const { group, loading, error } = groupDetails;
  console.log(group);

  const user = useSelector((state) => state.userLogin.userInfo);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    dispatch(getGroupDetails(group_tag)); // Fetch group details on component mount
  }, [dispatch, group_tag]);

  useEffect(() => {
    if (group && user) {
      setIsCreator(group.creator?.user_tag === user.token?.user_tag); // Use optional chaining
    }
  }, [group, user]);

  // Handle leave or delete group depending on whether the user is the creator
  const handleLeaveOrDelete = () => {
    if (isCreator) {
      dispatch(deleteGroup(group_tag));
      navigate("/groups"); // Redirect after deletion
    } else {
      dispatch(leaveGroup(group_tag));
      navigate("/groups"); // Redirect after leaving
    }
  };

  return (
    <>
      <div className="GroupViewPage">
        <NavigationBar />
        <div className="group-view-container">
          <div className="header">
            <div className="header-contents">
              {group?.group_image && (
                <img
                  src={group.group_image}
                  alt="Group"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              )}
              Group: {group?.name} #{group?.group_tag}
            </div>
            <div className="header-links">
              <a
                 href={`/groups/${group_tag}/announcements`}
                className="header-button"
              >
                Announcements
              </a>
              <a href={`/groups/${group_tag}/chat`} className="header-button">
                Chat
              </a>
              <a href={`/groups/${group_tag}/notes`} className="header-button">
                Notes
              </a>
              {isCreator && (
                <a href={`/groups/${group_tag}/edit`} className="header-button">
                  Edit Group
                </a>
              )}
            </div>
          </div>

          <div className="group-content-wrapper">
            <div className="group-content">
              {loading ? (
                <h2>Loading...</h2>
              ) : error ? (
                <h2>{error}</h2>
              ) : (
                <h2>Welcome to {group?.name}</h2>
              )}
            </div>

            <div className="group-creator">
              <h3>Group Creator:</h3>
              <p>
                {group?.creator?.name} #{group?.creator?.user_tag}
              </p>
            </div>

            <div className="members-list mt-4">
              <h3>Members:</h3>
              {group?.members && group.members.length > 0 ? (
                <ul>
                  {group.members.map((member, index) => (
                    <li key={index}>
                      {member.name} #{member.user_tag}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No members in this group.</p>
              )}
            </div>

            <div className="leave-group-btn-container text-center mt-4">
              <button
                className={isCreator ? "danger-button" : "warning-button"}
                onClick={handleLeaveOrDelete}
              >
                {isCreator ? "Delete Group" : "Leave Group"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupViewScreen;
