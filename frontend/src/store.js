import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  passwordChangeReducer,
  SendChangePasswordReducer,
  ConfirmChangePasswordReducer,
} from "./reducers/userReducers";
const reducer = {
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  passwordChange: passwordChangeReducer,
  SendcChangePassword: SendChangePasswordReducer,
  ConfirmChangePassword: ConfirmChangePasswordReducer,
};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
