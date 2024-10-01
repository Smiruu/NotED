
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
  
  const initialState = {
    loading: false,
    groups: [],
    group: {},
    error: null,
    favorite_groups: [],
    created_groups: [],
    joined_groups: [],

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

  export const groupImageRemoveReducer = (state = {}, action) => {
    switch (action.type) {
      case GROUP_IMAGE_REMOVE_REQUEST:
        return { loading: true };
      case GROUP_IMAGE_REMOVE_SUCCESS:
        return { loading: false, success: true, group_image: action.payload.group_image };
      case GROUP_IMAGE_REMOVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const groupJoinReducer = (state = {}, action) => {
    switch (action.type) {
      case GROUP_JOIN_REQUEST:
        return { loading: true };
      case GROUP_JOIN_SUCCESS:
        return { loading: false, success: true, message: action.payload.message };
      case GROUP_JOIN_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const favoriteGroupReducer = (state = {}, action) => {
    switch (action.type) {
      case GROUP_FAVORITE_ADD_REQUEST:
        return { loading: true };
      case GROUP_FAVORITE_ADD_SUCCESS:
        return { loading: false, success: true, message: action.payload.message };
      case GROUP_FAVORITE_ADD_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const favoriteGroupRemoveReducer = (state = {}, action) => {
    switch (action.type) {
      case GROUP_FAVORITE_REMOVE_REQUEST:
        return { loading: true };
      case GROUP_FAVORITE_REMOVE_SUCCESS:
        return { loading: false, success: true, message: action.payload.message };
      case GROUP_FAVORITE_REMOVE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const userGroupsReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_GROUPS_REQUEST:
        return { ...state, loading: true };
      case USER_GROUPS_SUCCESS:
        return {
          ...state,
          loading: false,
          favorite_groups: action.payload.favorite_groups,
          created_groups: action.payload.created_groups,
          joined_groups: action.payload.joined_groups,
        };
      case USER_GROUPS_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const groupsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case GROUPS_LIST_REQUEST:
            return { ...state, loading: true, error: null };
        case GROUPS_LIST_SUCCESS:
            return { ...state, loading: false, groups: action.payload };
        case GROUPS_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const groupLeaveReducer = (state = {}, action) => {
  switch (action.type) {
    case GROUP_LEAVE_REQUEST:
      return { loading: true };
    case GROUP_LEAVE_SUCCESS:
      return { loading: false, success: true, group: action.payload };
    case GROUP_LEAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const groupDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
      case GROUP_DETAILS_REQUEST:
          return { loading: true, ...state };
      case GROUP_DETAILS_SUCCESS:
          return { loading: false, group: action.payload };
      case GROUP_DETAILS_FAIL:
          return { loading: false, error: action.payload };
      default:
          return state;
  }
};

export const groupDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_GROUP_REQUEST:
      return { loading: true };
    case DELETE_GROUP_SUCCESS:
      return { loading: false, success: true };
    case DELETE_GROUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};