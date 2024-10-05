import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listToDoLists,
  createToDoList,
  updateToDoList,
  deleteToDoList,
} from "../actions/todolistActions";
import NavigationBar from "../components/NavigationBar";
import { Nav } from "react-bootstrap";
import "./css/TodolistScreen.css";

const TodolistScreen = () => {
  const dispatch = useDispatch();

  // Fetch the to-do list from the Redux store
  const todoListState = useSelector((state) => state.todoList);
  const { loading, error, todos } = todoListState;

  const todoCreateState = useSelector((state) => state.todoCreate);
  const { success: createSuccess } = todoCreateState;

  const todoUpdateState = useSelector((state) => state.todoUpdate);
  const { success: updateSuccess } = todoUpdateState;

  const todoDeleteState = useSelector((state) => state.todoDelete);
  const { success: deleteSuccess } = todoDeleteState;

  // Local state for managing input fields
  const [todoTitle, setTodoTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  // Fetch To-Do lists on component load or when success events occur
  useEffect(() => {
    dispatch(listToDoLists());
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  // Create a new To-Do list
  const handleCreate = () => {
    if (todoTitle.trim()) {
      dispatch(createToDoList({ title: todoTitle, completed: false }));
      setTodoTitle("");
    }
  };

  // Update a To-Do list
  const handleUpdate = (_id, updatedFields) => {
    dispatch(updateToDoList(_id, updatedFields));
    setEditingId(null);
    setEditingTitle("");
  };

  // Toggle the completion status of a To-Do item
  const handleToggleCompleted = (todo) => {
    dispatch(updateToDoList(todo._id, { completed: !todo.completed }));
  };

  // Delete all completed items
  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    if (completedTodos.length > 0) {
      if (
        window.confirm(
          "Are you sure you want to delete all completed to-do items?"
        )
      ) {
        completedTodos.forEach((todo) => dispatch(deleteToDoList(todo._id)));
      }
    } else {
      alert("No completed to-do items to delete.");
    }
  };

  return (
    <>
      <div className="todolist-screen">
        <NavigationBar />
        <div className="todolist-content">
          {/* Create To-Do Section (Top) */}
          <div className="create-todo">
            <h1>To-Do List</h1>
            <input
              type="text"
              placeholder="Enter a new task!"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
            <button onClick={handleCreate}>Create To-Do</button>
          </div>

          {/* To-Do List Section (Middle) */}
          <ul className="todo-list">
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <li
                  key={todo._id}
                  className={`todo-item ${todo.completed ? "completed" : ""}`}
                >
                  {editingId === todo._id ? (
                    <div className="todo-edit">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="todo-input"
                      />
                      <div className="todo-actions">
                        <button
                          onClick={() =>
                            handleUpdate(todo._id, { title: editingTitle })
                          }
                          className="todo-button save-button"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="todo-button cancel-button"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="todo-view">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleCompleted(todo)}
                        className="todo-checkbox"
                      />
                      <span
                        className={`todo-title ${
                          todo.completed ? "completed-text" : ""
                        }`}
                      >
                        {todo.title}
                      </span>
                      <button
                        onClick={() => {
                          setEditingId(todo._id);
                          setEditingTitle(todo.title);
                        }}
                        className="todo-button edit-button"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No To-Do items found</p>
            )}
          </ul>

          {/* Save Changes Button (Bottom) */}
          <div className="save-changes">
            <button
              className="task-done-button"
              onClick={handleDeleteCompleted}
              disabled={todos.filter((todo) => todo.completed).length === 0}
            >
              Task Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodolistScreen;
