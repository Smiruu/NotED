import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  listToDoLists,
  createToDoList,
  updateToDoList,
  deleteToDoList,
} from '../actions/todolistActions';

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
  const [todoTitle, setTodoTitle] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  // Fetch To-Do lists on component load or when success events occur
  useEffect(() => {
    dispatch(listToDoLists());
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  // Create a new To-Do list
  const handleCreate = () => {
    if (todoTitle.trim()) {
      dispatch(createToDoList({ title: todoTitle, completed: false }));
      setTodoTitle('');
    }
  };

  // Update a To-Do list
  const handleUpdate = (_id, updatedFields) => {
    dispatch(updateToDoList(_id, updatedFields));
    setEditingId(null);
    setEditingTitle('');
  };

  // Toggle the completion status of a To-Do item
  const handleToggleCompleted = (todo) => {
    dispatch(updateToDoList(todo._id, { completed: !todo.completed }));
  };

  // Delete all completed items
  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    if (completedTodos.length > 0) {
      if (window.confirm('Are you sure you want to delete all completed to-do items?')) {
        completedTodos.forEach((todo) => dispatch(deleteToDoList(todo._id)));
      }
    } else {
      alert('No completed to-do items to delete.');
    }
  };

  return (
    <div className="todolist-screen">
      <h1>To-Do List</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="create-todo">
        <input
          type="text"
          placeholder="Enter a new to-do"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <button onClick={handleCreate}>Create To-Do</button>
      </div>

      <ul className="todo-list">
        {todos && todos.length > 0 ? (
          todos.map((todo) => (
            <li key={todo._id} className={todo.completed ? 'completed' : ''}>
              {editingId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(todo._id, { title: editingTitle })}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(todo)}
                  />
                  <span className={todo.completed ? 'completed-text' : ''}>{todo.title}</span>
                  <button onClick={() => {
                    setEditingId(todo._id);
                    setEditingTitle(todo.title);
                  }}>
                    Edit
                  </button>
                </>
              )}
            </li>
          ))
        ) : (
          <p>No To-Do items found</p>
        )}
      </ul>

      {/* Save Changes button to delete all completed items */}
      <button
        onClick={handleDeleteCompleted}
        disabled={todos.filter(todo => todo.completed).length === 0}
      >
        Save Changes (Delete Completed Items)
      </button>
    </div>
  );
};

export default TodolistScreen;
