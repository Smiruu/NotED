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
import{
  todoListReducer,
  todoCreateReducer,
  todoUpdateReducer,
  todoDeleteReducer,
}
from './reducers/todolistReducers';
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

import {
  titleListReducer,
  titleCreateReducer,
  titleUpdateReducer,
  titleDeleteReducer,
  videoCreateReducer,
  videoDeleteReducer,
  videoListReducer,
  videoUpdateReducer,
  fileListReducer,
  fileCreateReducer,
  fileUpdateReducer,
  fileDeleteReducer,
  fileVideoReducer,

} from "./reducers/noteReducers";

import {
  announcementListReducer,
  announcementCreateReducer,
  announcementDeleteReducer,
} from "./reducers/announcementReducers";


import { conversationReducer, userListReducer } from "./reducers/chatsReducers";
const reducer = {
  //USERS
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  passwordChange: passwordChangeReducer,
  SendcChangePassword: SendChangePasswordReducer,
  ConfirmChangePassword: ConfirmChangePasswordReducer,
  userProfile: userProfileReducer,
  //TODOLIST
  todoList: todoListReducer,
  todoCreate: todoCreateReducer,
  todoUpdate: todoUpdateReducer,
  todoDelete: todoDeleteReducer,
  //GROUPS
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
  //CHATS
  userList: userListReducer,
  conversation: conversationReducer,
  //TITLES
  titleList: titleListReducer,
  titleCreate: titleCreateReducer,
  titleUpdate: titleUpdateReducer,
  titleDelete: titleDeleteReducer,
  //VIDEOS
  videoList: videoListReducer,
  videoCreate: videoCreateReducer,
  videoUpdate: videoUpdateReducer,
  videoDelete: videoDeleteReducer,
  //FILES 
  fileList: fileListReducer,
  fileCreate: fileCreateReducer,
  fileUpdate: fileUpdateReducer,
  fileDelete: fileDeleteReducer,

  fileVideo: fileVideoReducer,

  announcementList: announcementListReducer,
  announcementCreate: announcementCreateReducer,
  announcementDelete: announcementDeleteReducer,



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
