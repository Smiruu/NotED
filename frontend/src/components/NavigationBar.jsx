import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate here
import { useDispatch, useSelector } from "react-redux"; // Import hooks for Redux
import { fetchUserProfile, logout } from "../actions/userActions"; // Import the action to fetch user profile and logout
import "./css/NavigationBar.css"; // External CSS for styling the navbar
import { IoHome } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import { MdOutlineGroups2 } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to the login page
  };

  // Get user profile from Redux state
  const { userProfile, loading, error } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    // Fetch the user's profile when the component mounts
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <div className="navbar">
      <div className="profile-section">
        {/* Link to the profile page when clicking on the profile picture */}
        {userProfile?.profile?.photo && (
          <Link to="/profile">
            <img
              src={userProfile.profile.photo}
              alt="Profile"
              className="profile-pic"
            />
          </Link>
        )}
        {/* Link to the profile page */}
        <Link to="/profile" className="profile-btn">
          Profile
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button-home">
          <div className="nav-link-content">
            <IoHome size={30} />
            <span>Home</span>
          </div>
        </Link>
        <Link to="/inbox" className="nav-button-inbox">
          <div className="nav-link-content">
            <IoMdMail size={30} />
            <span>Inbox</span>
          </div>
        </Link>
        <Link to="/groups" className="nav-button-groups">
          <div className="nav-link-content">
            <MdOutlineGroups2 size={30} />
            <span className="group-icon-text">Groups</span>
          </div>
        </Link>
        <Link to="/todo" className="nav-button-todo">
          <div className="nav-link-content">
            <FaTasks size={30} />
            <span>Todo</span>
          </div>
        </Link>
      </div>
      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          <IoLogOutSharp size={40} />
          {/* <span>Logout</span> */}
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
