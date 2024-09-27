import axios from 'axios';
import {
  GROUP_CREATE_REQUEST,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_FAIL,
  GROUP_IMAGE_UPLOAD_REQUEST,
  GROUP_IMAGE_UPLOAD_SUCCESS,
  GROUP_IMAGE_UPLOAD_FAIL,
  GROUP_IMAGE_REMOVE_REQUEST,
  GROUP_IMAGE_REMOVE_SUCCESS,
  GROUP_IMAGE_REMOVE_FAIL,
  GROUP_JOIN_REQUEST,
  GROUP_JOIN_SUCCESS,
  GROUP_JOIN_FAIL,
  GROUP_FAVORITE_ADD_REQUEST,
  GROUP_FAVORITE_ADD_SUCCESS,
  GROUP_FAVORITE_ADD_FAIL,
  GROUP_FAVORITE_REMOVE_REQUEST,
  GROUP_FAVORITE_REMOVE_SUCCESS,
  GROUP_FAVORITE_REMOVE_FAIL,
  USER_GROUPS_REQUEST,
  USER_GROUPS_SUCCESS,
  USER_GROUPS_FAIL,
  GROUPS_LIST_REQUEST,
  GROUPS_LIST_SUCCESS,
  GROUPS_LIST_FAIL,
  GROUP_LEAVE_REQUEST,
  GROUP_LEAVE_SUCCESS,
  GROUP_LEAVE_FAIL,
  GROUP_DETAILS_REQUEST,
  GROUP_DETAILS_SUCCESS,
  GROUP_DETAILS_FAIL,
  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAIL,
  } from '../constants/groupConstants';
  
const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });


  
  export const createGroup = (groupData) => async (dispatch) => {
    try {
      dispatch({ type: GROUP_CREATE_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null; 
  
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await instance.post('/api/groups/create/', groupData, config);
      console.log(groupData)
  
      dispatch({
        type: GROUP_CREATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GROUP_CREATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const uploadGroupImage = (groupTag, imageData) => async (dispatch, getState) => {
    try {
      dispatch({ type: GROUP_IMAGE_UPLOAD_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const formData = new FormData();
      formData.append('group_image', imageData);
      formData.append('user_id', userInfo.id); // Include the user ID
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`, // Adjust based on your authentication setup
        },
      };
  
      const response = await axios.patch(`/api/groups/upload-image/${groupTag}/`, formData, config);
  
      dispatch({
        type: GROUP_IMAGE_UPLOAD_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GROUP_IMAGE_UPLOAD_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const removeGroupImage = (groupTag) => async (dispatch) => {
    try {
      dispatch({ type: GROUP_IMAGE_REMOVE_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null; 
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await instance.patch(`/api/groups/remove-image/${groupTag}/`, {}, config);
  
      dispatch({
        type: GROUP_IMAGE_REMOVE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GROUP_IMAGE_REMOVE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const joinGroup = (groupTag) => async (dispatch) => {
    try {
      dispatch({ type: GROUP_JOIN_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null; 
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await instance.post(`/api/groups/join/`, { group_tag: groupTag}, config);
  
      dispatch({
        type: GROUP_JOIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GROUP_JOIN_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const addFavoriteGroup = ( groupTag) => async (dispatch) => {
    try {
      dispatch({ type: GROUP_FAVORITE_ADD_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null;
  
      const response = await instance.post('/api/groups/add-favorite/', {
        group_tag: groupTag,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      dispatch({
        type: GROUP_FAVORITE_ADD_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GROUP_FAVORITE_ADD_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const removeFavoriteGroup = (groupTag) => async (dispatch, getState) => {
    try {
      dispatch({ type: GROUP_FAVORITE_REMOVE_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null;
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      const { data } = await instance.post(
        '/api/groups/remove-favorite/',
        { group_tag: groupTag },
        config
      );

      
  
      dispatch({
        type: GROUP_FAVORITE_REMOVE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GROUP_FAVORITE_REMOVE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const fetchUserGroups = () => async (dispatch) => {
    try {
      dispatch({ type: USER_GROUPS_REQUEST });
  
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null;
  
      const response = await instance.get('/api/groups/user-groups/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      dispatch({
        type: USER_GROUPS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_GROUPS_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const fetchGroupsList = () => async (dispatch) => {
    try {
        dispatch({ type: GROUPS_LIST_REQUEST });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null;

        const response = await instance.get('/api/groups/list/',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Adjust the URL as needed

        dispatch({
            type: GROUPS_LIST_SUCCESS,
            payload: response.data.groups, // Assuming the response structure
        });
    } catch (error) {
        dispatch({
            type: GROUPS_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

export const leaveGroup = (group_tag) => async (dispatch, getState) => {
  try {
    dispatch({ type: GROUP_LEAVE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Add token for authentication
      },
    };

    const { data } = await instance.post(
      `/api/groups/leave/`, // Your backend API endpoint
      { group_tag },
      config
    );

    dispatch({
      type: GROUP_LEAVE_SUCCESS,
      payload: data, // Data from the API response
    });
  } catch (error) {
    dispatch({
      type: GROUP_LEAVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getGroupDetails = (groupTag) => async (dispatch, getState) => {
  try {
      dispatch({ type: GROUP_DETAILS_REQUEST });
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null;
      // Assuming you have a base URL set for your API
      const { data } = await instance.get(`/api/groups/details/${groupTag}/`, {
          headers: {
              Authorization: `Bearer ${token}`, // Adjust based on your auth mechanism
          },
      });

      dispatch({
          type: GROUP_DETAILS_SUCCESS,
          payload: data,
      });
  } catch (error) {
      dispatch({
          type: GROUP_DETAILS_FAIL,
          payload: error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
      });
  }
};

export const deleteGroup = (group_tag) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_GROUP_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo ? userInfo.token.access : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Use your auth token here
      },
    };

    await instance.delete(`/api/groups/delete/${group_tag}/`, config); // Adjust URL as needed

    dispatch({ type: DELETE_GROUP_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_GROUP_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};