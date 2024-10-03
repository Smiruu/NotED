import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate here
import { useDispatch, useSelector } from "react-redux"; // Import hooks for Redux
import { fetchUserProfile, logout } from "../actions/userActions"; // Import the action to fetch user profile and logout
import "./css/NavigationBar.css"; // External CSS for styling the navbar

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
        {/* Display the profile picture if available */}
        {userProfile?.profile?.photo && (
          <img
            src={userProfile.profile.photo}
            alt="Profile"
            className="profile-pic"
          />
        )}
        {/* Link to the profile page */}
        <Link to="/profile" className="profile-btn">
          Profile
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button-home">
          Home
        </Link>
        <Link to="/inbox" className="nav-button-inbox">
          Inbox
        </Link>
        <Link to="/groups" className="nav-button-groups">
          Groups
        </Link>
        <Link to="/todo" className="nav-button-todo">
          To-Do
        </Link>
      </div>
      {/* Logout Button */}
      <div className="logout-section">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavigationBar;
