import {
    TITLE_LIST_REQUEST,
    TITLE_LIST_SUCCESS,
    TITLE_LIST_FAIL,
    TITLE_CREATE_REQUEST,
    TITLE_CREATE_SUCCESS,
    TITLE_CREATE_FAIL,
    TITLE_UPDATE_REQUEST,
    TITLE_UPDATE_SUCCESS,
    TITLE_UPDATE_FAIL,
    TITLE_DELETE_REQUEST,
    TITLE_DELETE_SUCCESS,
    TITLE_DELETE_FAIL,

    VIDEO_CREATE_FAIL,
    VIDEO_CREATE_REQUEST,
    VIDEO_CREATE_SUCCESS,
    VIDEO_DELETE_FAIL,
    VIDEO_DELETE_REQUEST,
    VIDEO_DELETE_SUCCESS,
    VIDEO_LIST_FAIL,
    VIDEO_LIST_REQUEST,
    VIDEO_LIST_SUCCESS,
    VIDEO_UPDATE_FAIL,
    VIDEO_UPDATE_REQUEST,
    VIDEO_UPDATE_SUCCESS,
    FILE_CREATE_FAIL,
    FILE_CREATE_REQUEST,
    FILE_CREATE_SUCCESS,
    FILE_DELETE_FAIL,
    FILE_DELETE_REQUEST,
    FILE_DELETE_SUCCESS,
    FILE_LIST_FAIL,
    FILE_LIST_REQUEST,
    FILE_LIST_SUCCESS,
    FILE_UPDATE_FAIL,
    FILE_UPDATE_REQUEST,
    FILE_UPDATE_SUCCESS


} from '../constants/noteConstants'

// Reducer for listing titles
export const titleListReducer = (state = { titles: [] }, action) => {
    switch (action.type) {
        case TITLE_LIST_REQUEST:
            return { loading: true, titles: [] }
        case TITLE_LIST_SUCCESS:
            return { loading: false, titles: action.payload }
        case TITLE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for creating a title
export const titleCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TITLE_CREATE_REQUEST:
            return { loading: true }
        case TITLE_CREATE_SUCCESS:
            return { loading: false, success: true, title: action.payload }
        case TITLE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for updating a title
export const titleUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case TITLE_UPDATE_REQUEST:
            return { loading: true }
        case TITLE_UPDATE_SUCCESS:
            return { loading: false, success: true, title: action.payload }
        case TITLE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for deleting a title
export const titleDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case TITLE_DELETE_REQUEST:
            return { loading: true }
        case TITLE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case TITLE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for listing videos
export const videoListReducer = (state = { videos: [] }, action) => {
    switch (action.type) {
        case VIDEO_LIST_REQUEST:
            return { loading: true, videos: [] }
        case VIDEO_LIST_SUCCESS:
            return { loading: false, videos: action.payload }
        case VIDEO_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for creating a video
export const videoCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_CREATE_REQUEST:
            return { loading: true }
        case VIDEO_CREATE_SUCCESS:
            return { loading: false, success: true, video: action.payload }
        case VIDEO_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for updating a video
export const videoUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_UPDATE_REQUEST:
            return { loading: true }
        case VIDEO_UPDATE_SUCCESS:
            return { loading: false, success: true, video: action.payload }
        case VIDEO_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for deleting a video
export const videoDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case VIDEO_DELETE_REQUEST:
            return { loading: true }
        case VIDEO_DELETE_SUCCESS:
            return { loading: false, success: true }
        case VIDEO_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for listing files
export const fileListReducer = (state = { files: [] }, action) => {
    switch (action.type) {
        case FILE_LIST_REQUEST:
            return { loading: true, files: [] }
        case FILE_LIST_SUCCESS:
            return { loading: false, files: action.payload }
        case FILE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for creating a file
export const fileCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case FILE_CREATE_REQUEST:
            return { loading: true }
        case FILE_CREATE_SUCCESS:
            return { loading: false, success: true, file: action.payload }
        case FILE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for updating a file
export const fileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case FILE_UPDATE_REQUEST:
            return { loading: true }
        case FILE_UPDATE_SUCCESS:
            return { loading: false, success: true, file: action.payload }
        case FILE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// Reducer for deleting a file
export const fileDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case FILE_DELETE_REQUEST:
            return { loading: true }
        case FILE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case FILE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

