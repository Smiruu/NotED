import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import {
  userLoginReducer,
  userRegisterReducer,
  passwordChangeReducer,
  SendChangePasswordReducer,
  ConfirmChangePasswordReducer,
  userProfileReducer,
} from "./reducers/userReducers";
<<<<<<< HEAD
=======
import{
  todoListReducer,
  todoCreateReducer,
  todoUpdateReducer,
  todoDeleteReducer,
}
from './reducers/todolistReducers';
>>>>>>> origin/master
import {
  favoriteGroupReducer,
  favoriteGroupRemoveReducer,
  groupCreateReducer,
  groupImageRemoveReducer,
  groupImageUploadReducer,
  groupJoinReducer,
  groupsListReducer,
  userGroupsReducer,
  groupLeaveReducer,
  groupDetailsReducer,
  groupDeleteReducer
} from "./reducers/groupReducers"
const reducer = {
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  passwordChange: passwordChangeReducer,
  SendcChangePassword: SendChangePasswordReducer,
  ConfirmChangePassword: ConfirmChangePasswordReducer,
<<<<<<< HEAD
=======
  userProfile: userProfileReducer,
  todoList: todoListReducer,
  todoCreate: todoCreateReducer,
  todoUpdate: todoUpdateReducer,
  todoDelete: todoDeleteReducer,
>>>>>>> origin/master
  groupCreate: groupCreateReducer,
  groupImageUpload: groupImageUploadReducer,
  gruopImageRemove: groupImageRemoveReducer,
  groupJoin: groupJoinReducer,
  favoriteGroup:favoriteGroupReducer,
  favoriteGroupRemove: favoriteGroupRemoveReducer,
  userGroups: userGroupsReducer,
  groupsList: groupsListReducer,
  groupLeave: groupLeaveReducer,
  groupDetails: groupDetailsReducer,
  groupDelete: groupDeleteReducer,
<<<<<<< HEAD
=======

>>>>>>> origin/master
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
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export default store;
