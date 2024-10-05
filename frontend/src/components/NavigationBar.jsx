import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages
import { useDispatch, useSelector } from 'react-redux'; // Import hooks for Redux
import { fetchUserProfile } from '../actions/userActions'; // Import the action to fetch user profile
import './css/NavigationBar.css'; // External CSS for styling the navbar

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector((state) => state.userProfile);
  const userInfo = useSelector((state) => state.userLogin.userInfo); // Get userInfo from Redux store

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserProfile()); // Fetch user profile only if userInfo exists
    }
  }, [dispatch, userInfo]);

  // Check if userInfo exists; if not, return null to hide the component
  if (!userInfo) {
    return null; // Hide the component
  }

  // Check if loading or an error occurred (only if userInfo exists)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching profile: {error}</div>;
  }

  // Extract the profile picture from the userProfile data
  const profilePic = userProfile ? userProfile.profile.photo : '';

  return (
    <div className="navbar">
      <div className="profile-section">
        {profilePic && (
          <img src={profilePic} alt="Profile" className="profile-pic" />
        )}
        <button className="profile-btn">Profile</button>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/inbox" className="nav-button">Inbox</Link>
        <Link to="/groups" className="nav-button">Groups</Link>
        <Link to="/todo" className="nav-button">To-Do</Link>
      </div>
    </div>
  );
};

export default NavigationBar;
