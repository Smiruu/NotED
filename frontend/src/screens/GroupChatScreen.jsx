import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import Chat from '../components/GroupChat';

const GroupChatScreen = () => {
    const { group_tag } = useParams(); // Get group_tag from URL parameters
    const user = useSelector((state) => state.userLogin.userInfo); // Assuming user info is in this state

    return (
        <div>
            <h1>Group Chat</h1>
            <Chat groupId={group_tag} currentUser={user} /> {/* Pass user info as props */}
        </div>
    );
};

export default GroupChatScreen;
