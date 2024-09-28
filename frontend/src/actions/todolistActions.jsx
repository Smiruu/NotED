import {
  TODOLIST_LIST_REQUEST,
  TODOLIST_LIST_SUCCESS,
  TODOLIST_LIST_FAIL,
  TODOLIST_CREATE_REQUEST,
  TODOLIST_CREATE_SUCCESS,
  TODOLIST_CREATE_FAIL,
  TODOLIST_UPDATE_REQUEST,
  TODOLIST_UPDATE_SUCCESS,
  TODOLIST_UPDATE_FAIL,
  TODOLIST_DELETE_REQUEST,
  TODOLIST_DELETE_SUCCESS,
  TODOLIST_DELETE_FAIL,
} from "../constants/todolistConstants";
import axios from 'axios';

// Create an axios instance for API requests
const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/todolist/',
});

// Helper function to get the token from local storage
const getToken = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return userInfo ? userInfo.token.access : null;
};

// Action to list To-Do Lists
export const listToDoLists = () => async (dispatch) => {
  try {
    dispatch({ type: TODOLIST_LIST_REQUEST });

    const token = getToken();
    const config = {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };

    const { data } = await instance.get('get/', config);
    dispatch({
      type: TODOLIST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODOLIST_LIST_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

// Action to create a new To-Do List
export const createToDoList = (todoData) => async (dispatch) => {
  try {
    dispatch({ type: TODOLIST_CREATE_REQUEST });

    const token = getToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };

    const { data } = await instance.post('create/', todoData, config);
    dispatch({
      type: TODOLIST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODOLIST_CREATE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

// Action to update an existing To-Do List
export const updateToDoList = (_id, updatedTodo) => async (dispatch) => {
  try {
    dispatch({ type: TODOLIST_UPDATE_REQUEST });

    const token = getToken();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };

    const { data } = await instance.put(`update/${_id}/`, updatedTodo, config);
    dispatch({
      type: TODOLIST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TODOLIST_UPDATE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};

// Action to delete a To-Do List
export const deleteToDoList = (_id) => async (dispatch) => {
  try {
    dispatch({ type: TODOLIST_DELETE_REQUEST });

    const token = getToken();
    const config = {
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
    };

    await instance.delete(`delete/${_id}/`, config);
    dispatch({
      type: TODOLIST_DELETE_SUCCESS,
      payload: _id,
    });
  } catch (error) {
    dispatch({
      type: TODOLIST_DELETE_FAIL,
      payload: error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message,
    });
  }
};
