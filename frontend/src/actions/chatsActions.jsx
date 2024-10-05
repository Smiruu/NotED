// actions/userActions.js
import axios from "axios";
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
} from "../constants/chatsContants";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
      },
    };

    const { data } = await instance.get("/api/chats/users/", config); // API endpoint to fetch users

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const fetchConversations = () => async (dispatch) => {
    try {
        dispatch({ type: FETCH_CONVERSATIONS_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const { data } = await instance.get('/api/chats/conversations/', config); // Adjust API endpoint as necessary

        dispatch({
            type: FETCH_CONVERSATIONS_SUCCESS,
            payload: data.conversations,
        });
    } catch (error) {
        dispatch({
            type: FETCH_CONVERSATIONS_FAILURE,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};