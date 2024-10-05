import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import NavigationBar from '../components/NavigationBar';

const chats = [
  { id: '1', name: 'Alice', lastMessage: 'Hey!' },
  { id: '2', name: 'Bob', lastMessage: 'See you!' },
  { id: '3', name: 'Charlie', lastMessage: 'Let’s chat!' },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userLogin.userInfo);// Move useSelector here



  // Check for userInfo in local storage
  useEffect(() => {
    if (!userInfo) {
      navigate('/login'); // Redirect to login if no userInfo
    }
  }, [navigate, userInfo]); // Add userInfo to dependency array

  return (
    <>
    <div>
      {/* <NavigationBar /> */}
      {/* Other content of the screen */}
    </div>
    <div>
      <h1>Messages</h1>
      <div>
        {chats.map(chat => (
          <div key={chat.id}>
            <strong>{chat.name}</strong>
            <p>{chat.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
  
}
export default HomeScreen;
