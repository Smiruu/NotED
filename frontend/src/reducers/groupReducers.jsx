
import {
    GROUP_CREATE_REQUEST,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_FAIL,
    GROUP_IMAGE_UPLOAD_REQUEST,
    GROUP_IMAGE_UPLOAD_SUCCESS,
    GROUP_IMAGE_UPLOAD_FAIL,
  } from './groupConstants';
  
  const initialState = {
    loading: false,
    group: null,
    error: null,
  };
  
  export const groupCreateReducer = (state = initialState, action) => {
    switch (action.type) {
      case GROUP_CREATE_REQUEST:
        return { loading: true };
      case GROUP_CREATE_SUCCESS:
        return { loading: false, group: action.payload };
      case GROUP_CREATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const groupImageUploadReducer = (state = initialState, action) => {
    switch (action.type) {
      case GROUP_IMAGE_UPLOAD_REQUEST:
        return { loading: true };
      case GROUP_IMAGE_UPLOAD_SUCCESS:
        return { loading: false, groupImage: action.payload.group_image };
      case GROUP_IMAGE_UPLOAD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };