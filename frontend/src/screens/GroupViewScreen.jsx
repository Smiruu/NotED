import React, { useState, useEffect } from "react";
import { Button, Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  leaveGroup,
  deleteGroup,
  getGroupDetails,
} from "../actions/groupActions";
import { useParams, useNavigate } from "react-router-dom";

const GroupViewScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { group_tag } = useParams(); // Get group_tag from URL

  const groupDetails = useSelector((state) => state.groupDetails);
  const { group, loading, error } = groupDetails;

  console.log(group.group_image)

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
    <div className="group-view-container">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="#">
        {group?.group_image && <img src={group.group_image} alt="Group" style={{ width: '50px', height: '50px', marginRight: '10px' }} />}
         Group: {group?.name} #{group?.group_tag}
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href={`/groups/${group_tag}/meetings`}>Meetings</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/groups/${group_tag}/chat`}>Chat</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href={`/groups/${group_tag}/notes`}>Notes</NavLink>
          </NavItem>
          {isCreator && (
            <NavItem>
              <NavLink href={`/groups/${group_tag}/edit`}>Edit Group</NavLink>
            </NavItem>
          )}
        </Nav>
      </Navbar>

      <div className="group-content">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <h2>Welcome to {group?.name}</h2>
        )}
      </div>

      <div>
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
        <Button
          color={isCreator ? "danger" : "warning"}
          onClick={handleLeaveOrDelete}
        >
          {isCreator ? "Delete Group" : "Leave Group"}
        </Button>
      </div>
    </div>
  );
};

export default GroupViewScreen;
