import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../actions/userActions";
import "./css/ProfileScreen.css";
import NavigationBar from "../components/NavigationBar";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userProfile, loading, error } = useSelector(
    (state) => state.userProfile
  );

  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track editing state

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    // Check if userProfile is available and set local state
    if (userProfile) {
      setBio(userProfile.profile.bio || "");
      setPhoto(userProfile.profile.photo || null);
    }
  }, [userProfile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", bio);
    if (photo) {
      formData.append("photo", photo);
    }

    // Dispatch the update action with FormData
    dispatch(updateUserProfile(formData));
    dispatch(fetchUserProfile());
    setIsEditing(false); // Exit editing mode after submission
  };

  return (
    <>
      <div className="ProfileScreen-main">
        <NavigationBar />
        <div className="profile-screen">
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && userProfile && (
            <>
              <div className="profile-header">
                <h1 className="profile-title">User Profile</h1>
              </div>
              <div className="profile-container">
                <div className="profile-info">
                  <img
                    src={userProfile.profile.photo || "/default-profile.png"}
                    alt="Profile"
                    className="profile-photo"
                  />
                  <div className="profile-text">
                    <h2 className="profile-username">
                      {userProfile.profile.user_name}
                    </h2>
                    <p className="profile-tag">
                      @{userProfile.profile.user_tag}
                    </p>
                    <p className="profile-bio">{userProfile.profile.bio}</p>
                  </div>
                </div>
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </div>

              {isEditing && (
                <div className="edit-form-container">
                  <form onSubmit={handleSubmit} className="edit-form">
                    <div className="form-group">
                      <label htmlFor="bio" className="form-label">
                        Bio:
                      </label>
                      <div className="textarea-container">
                        <textarea
                          id="bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                          className="form-textarea"
                          maxLength={100}
                        />
                        <span
                          className={`char-counter ${
                            bio.length >= 85 ? "warning" : ""
                          }`}
                        >
                          {bio.length}/100
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="photo" className="form-label">
                        Profile Photo:
                      </label>
                      <input
                        type="file"
                        id="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="form-input"
                        accept="image/jpeg, image/png" // Restricts file input to JPG and PNG files
                      />
                    </div>
                    <div className="form-buttons">
                      <button type="submit" className="submit-button">
                        Update Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="cancel-button"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
