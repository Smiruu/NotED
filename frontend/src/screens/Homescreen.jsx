import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGroups } from "../actions/groupActions";
import NavigationBar from "../components/NavigationBar";
import FolderCard from '../components/FolderCard'; // Adjust the path as needed
import "./css/Homescreen.css";

const chats = [
  { id: "1", name: "Alice", lastMessage: "Hey!" },
  { id: "2", name: "Bob", lastMessage: "See you!" },
  { id: "3", name: "Charlie", lastMessage: "Let’s chat!" },
];

const todoList = [
  { id: "1", task: "Finish report", details: "Complete the quarterly report" },
  { id: "2", task: "Grocery shopping", details: "Buy groceries for the week" },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const userGroups = useSelector((state) => state.userGroups);
  const { loading, error, created_groups, joined_groups } = userGroups;

  // Check for userInfo in local storage
  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login if no userInfo
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    // Fetch user groups on component mount
    dispatch(fetchUserGroups());
  }, [dispatch]);

  return (
    <div className="homescreenpage">
      <NavigationBar />
      <div className="content">
        <div className="messages-column">
          <h1>Messages</h1>
          {chats.map((chat) => (
            <div key={chat.id} className="message">
              <strong>{chat.name}</strong>
              <p>{chat.lastMessage}</p>
            </div>
          ))}
        </div>

        <div className="groups-column">
          <h1>Groups</h1>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          
          <div className="folder-card-container">
            {/* Combine created_groups and joined_groups */}
            {[...created_groups, ...joined_groups].map((group) => (
              <FolderCard key={group.group_tag} group={group} />
            ))}
          </div>
        </div>

        <div className="todo-column">
          <h1>To-Do List</h1>
          {todoList.map((todo) => (
            <div key={todo.id} className="todo-item">
              <strong>{todo.task}</strong>
              <p>{todo.details}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
