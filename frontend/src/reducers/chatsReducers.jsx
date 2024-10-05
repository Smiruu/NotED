// reducers/userReducer.js
import { 
    USER_LIST_REQUEST, 
    USER_LIST_SUCCESS, 
    USER_LIST_FAIL,
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
} from '../constants/chatsContants';


const initialState = {
    loading: false,
    conversations: [],
    error: null,
};
export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_LIST_REQUEST:
            return { loading: true, users: [] };
        case USER_LIST_SUCCESS:
            return { loading: false, users: action.payload };
        case USER_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CONVERSATIONS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_CONVERSATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                conversations: action.payload,
            };
        case FETCH_CONVERSATIONS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
