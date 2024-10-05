// components/SearchList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/chatsActions';
import './css/ChatList.css'; // Ensure you have a CSS file for styling

const SearchList = ({ searchTerm, onUserSelect }) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const userInfo = useSelector((state) => state.userLogin.userInfo); 

    useEffect(() => {
        dispatch(listUsers());
    }, [dispatch]);

    // Get the current user's tag from userInfo
    const currentUserTag = userInfo.token.user_tag;

    // Filter users based on the search term, excluding the current user
    const filteredUsers = users ? users.filter(user => {
        return user.name.toLowerCase().includes(searchTerm.toLowerCase()) && user.user_tag !== currentUserTag; // Exclude current user
    }) : [];

    return (
        <div className="chat-list">
            {loading ? (
                <p>Loading users...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <li 
                                key={user.user_tag} 
                                className="chat-list-item" 
                                onClick={() => onUserSelect(user.user_tag, user.name, user.photo)} // Handle user selection
                            >
                                <img 
                                    src={user.photo} // Assuming `photo` contains the URL to the user's image
                                    alt={`${user.name}'s profile`}
                                    className="chat-list-item-photo"
                                />
                                <div className="chat-list-item-info">
                                    <span className="chat-list-item-name">{user.name}</span>
                                    <span className="chat-list-item-tag">{user.user_tag}</span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No users found</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default SearchList;
