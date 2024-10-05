import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserGroups } from "../actions/groupActions";
import { listToDoLists } from "../actions/todolistActions"; // Import the action to fetch todos
import NavigationBar from "../components/NavigationBar";
import FolderCard from '../components/FolderCard'; // Adjust the path as needed
import "./css/Homescreen.css";

const chats = [
  { id: "1", name: "Alice", lastMessage: "Hey!" },
  { id: "2", name: "Bob", lastMessage: "See you!" },
  { id: "3", name: "Charlie", lastMessage: "Let’s chat!" },
];

const HomeScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const userGroups = useSelector((state) => state.userGroups);
  const { loading, error, created_groups, joined_groups } = userGroups;

  // Fetch the to-do list from the Redux store
  const todoListState = useSelector((state) => state.todoList);
  const { loading: loadingTodos, error: todoError, todos } = todoListState;

  // Check for userInfo in local storage
  useEffect(() => {
    if (!userInfo) {
      navigate("/login"); // Redirect to login if no userInfo
    }
  }, [navigate, userInfo]);

  useEffect(() => {
    // Fetch user groups on component mount
    dispatch(fetchUserGroups());
    dispatch(listToDoLists()); // Fetch the user's to-do lists
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
          {loadingTodos && <p>Loading To-Do items...</p>}
          {todoError && <p>{todoError}</p>}
          {todos && todos.length > 0 ? (
            todos.map((todo) => (
              <div key={todo._id} className="todo-item">
                <strong>{todo.title}</strong>
                <p>{todo.details}</p> {/* Assuming you have a details field */}
              </div>
            ))
          ) : (
            <p>No To-Do items found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
