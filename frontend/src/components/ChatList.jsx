// components/ConversationList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversations } from '../actions/chatsActions';
import './css/ChatList.css'; // Ensure you have a CSS file for styling

const ChatList = ({ onConversationSelect }) => {
    const dispatch = useDispatch();

    const conversationList = useSelector((state) => state.conversation);
    const { loading, error, conversations } = conversationList ; // Fallback to prevent destructuring errors

    useEffect(() => {
        dispatch(fetchConversations());
    }, [dispatch]);

    return (
        <div className="chat-list">
            {loading ? (
                <p>Loading conversations...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {conversations && conversations.length > 0 ? (
                        conversations.map(conversation => (
                            <li 
                                key={conversation.id} // Assuming `id` is a unique identifier for the conversation
                                className="chat-list-item"
                                onClick={() => onConversationSelect(conversation.user_tag, conversation.username, conversation.photo)} // Handle conversation selection
                            >
                                <img 
                                    src={conversation.photo} // Assuming `photo` contains the URL to the user's image
                                    alt={`${conversation.username}'s profile`} // Adjust as necessary
                                    className="chat-list-item-photo"
                                />
                                <div className="chat-list-item-info">
                                    <span className="chat-list-item-name">{conversation.username}</span> {/* Adjust field names based on your data */}
                                    <span className="chat-list-item-tag">{conversation.user_tag}</span> {/* Adjust field names based on your data */}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No conversations found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default ChatList;
