import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listAnnouncements, createAnnouncement, deleteAnnouncement } from '../actions/announcementActions';
import { Button } from 'react-bootstrap'; // Import Button from React Bootstrap
import CreateAnnouncement from '../components/CreateAnnouncement'; // Import CreateAnnouncement component

const AnnouncementScreen = () => {
    const { group_tag } = useParams(); // Get group_tag from URL parameters
    const dispatch = useDispatch();

    const announcementList = useSelector((state) => state.announcementList);
    const { loading, error, announcements } = announcementList;

    const announcementCreate = useSelector((state) => state.announcementCreate);
    const { success: successCreate } = announcementCreate;

    const announcementDelete = useSelector((state) => state.announcementDelete);
    const { success: successDelete } = announcementDelete;

    useEffect(() => {
        dispatch(listAnnouncements(group_tag));
    }, [dispatch, group_tag, successCreate, successDelete]);

    const handleDelete = (announcement_id) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            dispatch(deleteAnnouncement(group_tag, announcement_id)); // Use _id for deletion
        }
    };

    return (
        <div>
            <h1>Announcements for Group: {group_tag}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <ul>
                    {announcements.slice().reverse().map((announcement) => ( // Reverse the list
                        <li key={announcement._id}>
                            <h3>{announcement.title}</h3>
                            <p>{announcement.text}</p>
                            {announcement.link && (
                                <p>
                                    <a href={announcement.link} target="_blank" rel="noopener noreferrer">
                                        {announcement.link}
                                    </a>
                                </p>
                            )}
                            <Button variant="danger" onClick={() => handleDelete(announcement._id)}>Delete</Button>
                        </li>
                    ))}
                </ul>
            )}
            <CreateAnnouncement group_tag={group_tag} /> {/* Render the CreateAnnouncement component */}
        </div>
    );
};

export default AnnouncementScreen;
