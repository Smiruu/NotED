import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '../actions/userActions';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { userProfile, loading, error } = useSelector((state) => state.userProfile);

    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Track editing state

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        // Check if userProfile is available and set local state
        if (userProfile) {
            setBio(userProfile.profile.bio || '');
            setPhoto(userProfile.profile.photo || null);
        }
    }, [userProfile]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('bio', bio);
        if (photo) {
            formData.append('photo', photo);
        }

        // Dispatch the update action with FormData
        dispatch(updateUserProfile(formData));
        dispatch(fetchUserProfile());
        setIsEditing(false); // Exit editing mode after submission
    };

    return (
        <div className="profile-screen">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && userProfile && (
                <>
                    <h1>User Profile</h1>
                    <div className="profile-info">
                        <h2>{userProfile.profile.user_name}</h2>
                        <p>@{userProfile.profile.user_tag}</p>
                        {userProfile.profile.photo && (
                            <img src={userProfile.profile.photo} alt="Profile" />
                        )}
                        <p>{userProfile.profile.bio}</p>
                    </div>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>

                    {isEditing && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="bio">Bio:</label>
                                <textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="photo">Profile Photo:</label>
                                <input
                                    type="file"
                                    id="photo"
                                    onChange={(e) => setPhoto(e.target.files[0])}
                                />
                            </div>
                            <button type="submit">Update Profile</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    )}
                </>
            )}
        </div>
    );
};

export default ProfileScreen;
