import axios from "axios";
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

const instance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
});

export const listAnnouncements = (group_tag) => async (dispatch) => {
    try {
        dispatch({ type: ANNOUNCEMENT_LIST_REQUEST });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null;

        console.log("Token:", token); // Debugging line

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Ensure the token is included
            },
        };

        const { data } = await instance.get(`/api/announcements/${group_tag}/`, config);

        dispatch({
            type: ANNOUNCEMENT_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ANNOUNCEMENT_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createAnnouncement = (group_tag, announcement) => async (dispatch) => {
    try {
        dispatch({
            type: ANNOUNCEMENT_CREATE_REQUEST,
        });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null;

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        const { data } = await instance.post(
            `/api/announcements/create/${group_tag}/`,
            announcement,
            config
        );

        dispatch({
            type: ANNOUNCEMENT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ANNOUNCEMENT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteAnnouncement = (group_tag, announcement_id) => async (dispatch) => {
    try {
        dispatch({
            type: ANNOUNCEMENT_DELETE_REQUEST,
        });

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = userInfo ? userInfo.token.access : null;

        const config = {
            headers: {
                Authorization: `Bearer ${token}`, // Include the JWT token for authenticated requests
            },
        };

        await instance.delete(`/api/announcements/delete/${group_tag}/${announcement_id}/`, config); // Use announcement_id instead of announcement_tag

        dispatch({
            type: ANNOUNCEMENT_DELETE_SUCCESS,
        });
    } catch (error) {
        dispatch({
            type: ANNOUNCEMENT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};
