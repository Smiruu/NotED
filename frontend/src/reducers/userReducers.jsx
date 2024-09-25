import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CONFIRM_CHANGE_PASSWORD_SUCCESS,
  CONFIRM_CHANGE_PASSWORD_REQUEST,
  CONFIRM_CHANGE_PASSWORD_FAIL,
} from "../constants/userConstants";
const initialState = {
  loading: false,
  success: false,
  error: null,
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const userLoginReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return { user: null };

    default:
      return state;
  }
};

export const passwordChangeReducer = (state = initialState, action) => {
  switch (action.type) {
      case CHANGE_PASSWORD_REQUEST:
          return {
              ...state,
              loading: true,
              success: false,
              error: null,
          };
      case CHANGE_PASSWORD_SUCCESS:
          return {
              ...state,
              loading: false,
              success: true,
              error: null,
          };
      case CHANGE_PASSWORD_FAILURE:
          return {
              ...state,
              loading: false,
              success: false,
              error: action.payload,
          };
      default:
          return state;
  }
};

export const SendChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return { loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case RESET_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ConfirmChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case CONFIRM_CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case CONFIRM_CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case CONFIRM_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};