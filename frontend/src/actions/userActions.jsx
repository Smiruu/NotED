import axios from 'axios';
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
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });

  export const register = (name, email, password, password2) => async (dispatch) => {
      try {
          dispatch({ type: USER_REGISTER_REQUEST });
          const config = {
              headers: {
                  "Content-Type": "application/json",
              },
          };
  
          const { data } = await instance.post(
              "api/user/register/",
              { name, email, password, password2 },
              config
          );
  
          // Dispatch USER_REGISTER_SUCCESS action
          dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: data,  // Use USER_REGISTER_SUCCESS instead of USER_LOGIN_SUCCESS
          });
  
          // Optionally dispatch USER_LOGIN_SUCCESS if you want to automatically log in the user after registration
          dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: data,
          });
  
          // Store user info in local storage
          localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
          dispatch({
              type: USER_REGISTER_FAIL,
              payload: error.response && error.response.data.details
                  ? error.response.data.details
                  : error.message,
          });
      }
  };
  
  export const login = (email, password) => async (dispatch) => {
      try {
          dispatch({ type: USER_LOGIN_REQUEST });
          const config = {
              headers: {
                  'Content-Type': 'application/json',
              },
          };
  
          const { data } = await instance.post(
              'api/user/login/',
              { email, password },
              config
          );
  
          // Dispatch USER_LOGIN_SUCCESS action
          dispatch({
              type: USER_LOGIN_SUCCESS,
              payload: data,
          });
  
          // Store user info in local storage
          localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
          dispatch({
              type: USER_LOGIN_FAIL,
              payload: error.response && error.response.data.details
                  ? error.response.data.details
                  : error.message,
          });
      }
  };
  

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
};

export const changePassword = (passwordData) => async (dispatch, getState) => {
  try {
      dispatch({ type: CHANGE_PASSWORD_REQUEST });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo ? userInfo.token.access : null; // Assuming you store the auth token in the state

      const config = {
          headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Attach token for authenticated requests
          },
      };

      const response = await instance.post('/api/change-password/', passwordData, config);

      dispatch({
          type: CHANGE_PASSWORD_SUCCESS,
          payload: response.data,
      });
  } catch (error) {
      dispatch({
          type: CHANGE_PASSWORD_FAILURE,
          payload: error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
      });
  }
};

export const sendrequestChangePassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await instance.post(
      "api/user/send-reset-password-email/",
      { email },
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const ConfirmChangePassword =
  (uid, token, password, password2) => async (dispatch) => {
    try {
      dispatch({
        type: CONFIRM_CHANGE_PASSWORD_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await instance.post(
        `api/user/reset-password/${uid}/${token}`,
        { password, password2 },
        config
      );

      dispatch({
        type: CONFIRM_CHANGE_PASSWORD_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: CONFIRM_CHANGE_PASSWORD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const fetchUserProfile = () => async (dispatch) => {
    try {
        dispatch({ type: USER_PROFILE_REQUEST });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null;

        const { data } = await instance.get('/api/user/profile/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Adjust the URL as needed

        dispatch({
            type: USER_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: USER_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};

// Action to update user profile
export const updateUserProfile = (profileData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null;
        console.log(profileData)

        const { data } = await instance.put('/api/user/profile/', profileData,{
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          },
        }); // Adjust the URL as needed

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        });
    }
};