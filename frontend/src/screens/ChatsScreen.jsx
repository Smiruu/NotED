// components/ChatsScreen.js
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchList from '../components/SearchList';
import ChatWindow from '../components/ChatWindow';
import ChatList from '../components/ChatList'; // Import the ConversationList component
import './css/ChatsScreen.css'; // Import CSS for ChatsScreen styling

// components/ChatsScreen.js
const ChatsScreen = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUserTag, setSelectedUserTag] = useState(null);

    const handleUserSelect = (userTag) => {
        console.log("Selected User Tag: ", userTag); // Debug log
        setSelectedUserTag(userTag);
    };

    return (
        <div className="chats-screen">
            <div className="search-bar">
                <SearchBar onSearch={setSearchTerm} />
            </div>
            <div className="chat-container">
                <div className="chat-list-container">
                    {searchTerm ? (
                        <SearchList searchTerm={searchTerm} onUserSelect={handleUserSelect} />
                    ) : (
                        <ChatList onConversationSelect={handleUserSelect} />
                    )}
                </div>
                <div className="chat-window-container">
                    {selectedUserTag && <ChatWindow receiverTag={selectedUserTag} />}
                </div>
            </div>
        </div>
    );
};


export default ChatsScreen;
