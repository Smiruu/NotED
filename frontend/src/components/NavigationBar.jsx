import React from 'react';
import { Link } from 'react-router-dom'; // For navigation between pages
import './css/NavigationBar.css'; // External CSS for styling the navbar

const NavigationBar = ({ profilePic }) => {
  return (
    <div className="navbar">
      <div className="profile-section">
        <img src={profilePic} alt="Profile" className="profile-pic" />
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
