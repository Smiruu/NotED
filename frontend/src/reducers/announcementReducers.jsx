import {
    ANNOUNCEMENT_LIST_REQUEST,
    ANNOUNCEMENT_LIST_SUCCESS,
    ANNOUNCEMENT_LIST_FAIL,
    ANNOUNCEMENT_CREATE_REQUEST,
    ANNOUNCEMENT_CREATE_SUCCESS,
    ANNOUNCEMENT_CREATE_FAIL,
    ANNOUNCEMENT_DELETE_REQUEST,
    ANNOUNCEMENT_DELETE_SUCCESS,
    ANNOUNCEMENT_DELETE_FAIL,
} from '../constants/announcementConstants';

export const announcementListReducer = (state = { announcements: [] }, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_LIST_REQUEST:
            return { loading: true, announcements: [] };
        case ANNOUNCEMENT_LIST_SUCCESS:
            return { loading: false, announcements: action.payload };
        case ANNOUNCEMENT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const announcementCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_CREATE_REQUEST:
            return { loading: true };
        case ANNOUNCEMENT_CREATE_SUCCESS:
            return { loading: false, success: true, announcement: action.payload };
        case ANNOUNCEMENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const announcementDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_DELETE_REQUEST:
            return { loading: true };
        case ANNOUNCEMENT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case ANNOUNCEMENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

