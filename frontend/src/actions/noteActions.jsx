import axios from "axios";
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





const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
  });


// Title Actions
export const listTitles = (group_tag) => async (dispatch, getState) => {
    try {
        dispatch({ type: TITLE_LIST_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.get(`/api/notes/titles/${group_tag}/`, config); // API endpoint to fetch titles

        dispatch({
            type: TITLE_LIST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: TITLE_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const createTitle = (group_tag,titleData) => async (dispatch) => {
    try {
        dispatch({ type: TITLE_CREATE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.post(`/api/notes/titles/create/${group_tag}/`, titleData, config); // API endpoint to create a title

        dispatch({
            type: TITLE_CREATE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: TITLE_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const updateTitle = (_id, titleData,group_tag) => async (dispatch) => {
    try {
        dispatch({ type: TITLE_UPDATE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.put(`/api/notes/titles/edit/${group_tag}/${_id}/`, titleData, config); // API endpoint to update a title

        dispatch({
            type: TITLE_UPDATE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: TITLE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const deleteTitle = (_id,group_tag) => async (dispatch) => {
    try {
        dispatch({ type: TITLE_DELETE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        await instance.delete(`/api/notes/titles/delete/${group_tag}/${_id}/`, config); // API endpoint to delete a title

        dispatch({
            type: TITLE_DELETE_SUCCESS,
            payload: _id,
        });
    } catch (error) {
        dispatch({
            type: TITLE_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

//Video Actions

export const listVideos = (group_tag) => async (dispatch, getState) => {
    try {
        dispatch({ type: VIDEO_LIST_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.get(`/api/notes/videos/${group_tag}/`, config); // API endpoint to fetch videos

        dispatch({
            type: VIDEO_LIST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: VIDEO_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const createVideo = (group_tag,videoData) => async (dispatch) => {
    try {
        dispatch({ type: VIDEO_CREATE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.post(`/api/notes/videos/create/${group_tag}/`, videoData, config); // API endpoint to create a video

        dispatch({
            type: VIDEO_CREATE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: VIDEO_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const updateVideo = (_id, videoData,group_tag) => async (dispatch) => {
    try {
        dispatch({ type: VIDEO_UPDATE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.put(`/api/notes/videos/edit/${group_tag}/${_id}/`, videoData, config); // API endpoint to update a video

        dispatch({
            type: VIDEO_UPDATE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: VIDEO_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const deleteVideo = (_id,group_tag) => async (dispatch) => {
    try {
        dispatch({ type: VIDEO_DELETE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        await instance.delete(`/api/notes/videos/delete/${group_tag}/${_id}/`, config); // API endpoint to delete a video

        dispatch({
            type: VIDEO_DELETE_SUCCESS,
            payload: _id,
        });
    } catch (error) {
        dispatch({
            type: VIDEO_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

//File Actions

export const listFiles = (group_tag) => async (dispatch, getState) => {
    try {
        dispatch({ type: FILE_LIST_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.get(`/api/notes/files/${group_tag}/`, config); // API endpoint to fetch files

        dispatch({
            type: FILE_LIST_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FILE_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

    export const createFile = (group_tag,fileData) => async (dispatch) => {
        try {
            dispatch({ type: FILE_CREATE_REQUEST });

            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
                },
            };

            const response = await instance.post(`/api/notes/files/create/${group_tag}/`, fileData, config); // API endpoint to create a file

            dispatch({
                type: FILE_CREATE_SUCCESS,
                payload: response.data,
            });
        } catch (error) {
            dispatch({
                type: FILE_CREATE_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    }

export const updateFile = (_id, fileData,group_tag) => async (dispatch) => {
    try {
        dispatch({ type: FILE_UPDATE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const response = await instance.put(`/api/notes/files/edit/${group_tag}/${_id}/`, fileData, config); // API endpoint to update a file

        dispatch({
            type: FILE_UPDATE_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        dispatch({
            type: FILE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}

export const deleteFile = (_id,group_tag) => async (dispatch) => {
    try {
        dispatch({ type: FILE_DELETE_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null; // Assuming the login token is stored in the state

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        await instance.delete(`/api/notes/files/delete/${group_tag}/${_id}/`, config); // API endpoint to delete a file

        dispatch({
            type: FILE_DELETE_SUCCESS,
            payload: _id,
        });
    } catch (error) {
        dispatch({
            type: FILE_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
}
