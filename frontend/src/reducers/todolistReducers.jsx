import {
  TODOLIST_LIST_REQUEST,
  TODOLIST_LIST_SUCCESS,
  TODOLIST_LIST_FAIL,
  TODOLIST_CREATE_REQUEST,
  TODOLIST_CREATE_SUCCESS,
  TODOLIST_CREATE_FAIL,
  TODOLIST_UPDATE_REQUEST,
  TODOLIST_UPDATE_SUCCESS,
  TODOLIST_UPDATE_FAIL,
  TODOLIST_DELETE_REQUEST,
  TODOLIST_DELETE_SUCCESS,
  TODOLIST_DELETE_FAIL,
} from '../constants/todolistConstants';

// Reducer for fetching the list of todos
export const todoListReducer = (state = { todos: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case TODOLIST_LIST_REQUEST:
      return { ...state, loading: true };
    case TODOLIST_LIST_SUCCESS:
      return { loading: false, todos: action.payload, error: null };
    case TODOLIST_LIST_FAIL:
      return { loading: false, todos: [], error: action.payload };
    default:
      return state;
  }
};

// Reducer for creating a new todo
export const todoCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TODOLIST_CREATE_REQUEST:
      return { loading: true };
    case TODOLIST_CREATE_SUCCESS:
      return { loading: false, success: true, todo: action.payload };
    case TODOLIST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for updating an existing todo
export const todoUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case TODOLIST_UPDATE_REQUEST:
      return { loading: true };
    case TODOLIST_UPDATE_SUCCESS:
      return { loading: false, success: true, todo: action.payload };
    case TODOLIST_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// Reducer for deleting a todo
export const todoDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TODOLIST_DELETE_REQUEST:
      return { loading: true };
    case TODOLIST_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TODOLIST_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
