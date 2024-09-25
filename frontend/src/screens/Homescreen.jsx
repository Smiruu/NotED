import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const chats = [
  { id: '1', name: 'Alice', lastMessage: 'Hey!' },
  { id: '2', name: 'Bob', lastMessage: 'See you!' },
  { id: '3', name: 'Charlie', lastMessage: 'Let’s chat!' },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo") // Move useSelector here

  // Check for userInfo in local storage
  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // Redirect to login if no userInfo
    }
  }, [navigate, userInfo]); // Add userInfo to dependency array

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Messages</h1>
      <div style={styles.chatList}>
        {chats.map(chat => (
          <div key={chat.id} style={styles.chatBubble}>
            <strong style={styles.contactName}>{chat.name}</strong>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  chatList: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  chatBubble: {
    padding: '15px',
    borderBottom: '1px solid #ccc',
  },
  contactName: {
    fontWeight: 'bold',
  },
};

export default HomeScreen;
