import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // Import useParams
import Chat from "../components/GroupChat";
import NavigationBar from "../components/NavigationBar";
import { getGroupDetails } from "../actions/groupActions"; // Import the action
import "./css/GroupChatScreen.css";

const GroupChatScreen = () => {
  const dispatch = useDispatch();
  const { group_tag } = useParams(); // Get group_tag from URL parameters
  const user = useSelector((state) => state.userLogin.userInfo); // Assuming user info is in this state

  // Fetch group details from Redux state
  const groupDetails = useSelector((state) => state.groupDetails);
  const { group } = groupDetails;

  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    dispatch(getGroupDetails(group_tag)); // Fetch group details on component mount
  }, [dispatch, group_tag]);

  useEffect(() => {
    if (group && user) {
      setIsCreator(group.creator?.user_tag === user.token?.user_tag); // Check if the user is the creator
    }
  }, [group, user]);

  return (
    <div className="group-chat-main">
      <NavigationBar />
      <div className="group-chat-content">
        {/* Header from GroupViewScreen */}
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
            <a href={`/groups/${group_tag}/meetings`} className="header-button">
              Meetings
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

        <div className="group-chat-container-flex">
          {/* Group Chat */}
          <h1>Group Chat</h1>
          <Chat groupId={group_tag} currentUser={user} />{" "}
          {/* Pass user info as props */}
        </div>
      </div>
    </div>
  );
};

export default GroupChatScreen;
