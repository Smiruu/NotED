import axios from 'axios';
import {
    GROUP_CREATE_REQUEST,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_FAIL,
    GROUP_IMAGE_UPLOAD_REQUEST,
    GROUP_IMAGE_UPLOAD_SUCCESS,
    GROUP_IMAGE_UPLOAD_FAIL,
  } from './groupConstants';
  
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
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
  
      const response = await instance.post('/api/groups/create/', groupData, config);
  
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