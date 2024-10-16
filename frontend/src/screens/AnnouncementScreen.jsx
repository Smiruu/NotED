import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listAnnouncements, deleteAnnouncement } from '../actions/announcementActions';
import { Button, Dropdown } from 'react-bootstrap'; // Import Dropdown from React Bootstrap
import CreateAnnouncement from '../components/CreateAnnouncement'; // Import CreateAnnouncement component
import "./css/AnnouncementScreen.css";
import NavigationBar from '../components/NavigationBar';

const AnnouncementScreen = () => {
    const { group_tag } = useParams(); // Get group_tag from URL parameters
    const dispatch = useDispatch();

    const announcementList = useSelector((state) => state.announcementList);
    const { loading, error, announcements } = announcementList;

    const announcementDelete = useSelector((state) => state.announcementDelete);
    const { success: successDelete } = announcementDelete;

    useEffect(() => {
        dispatch(listAnnouncements(group_tag));
    }, [dispatch, group_tag, successDelete]);

    const handleDelete = (announcement_id) => {
        if (window.confirm('Are you sure you want to delete this announcement?')) {
            dispatch(deleteAnnouncement(group_tag, announcement_id)); // Use _id for deletion
        }
    };

    return (
        <div className='announcement-screen-main'>
            <NavigationBar />
            <div className='announcement-screen-content'>
                <h1 className='announcement-title'>Announcements for Group: {group_tag}</h1>
                <div className='abtnplacement'>
                    <CreateAnnouncement className='announcement-button' group_tag={group_tag} />
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <ul className='announcementlist'>
                        {announcements.slice().reverse().map((announcement) => ( // Reverse the list
                            <li key={announcement._id} className="announcement-item">
                                <div className="announcement-header">
                                    <h3>{announcement.title}</h3>
                                    <Dropdown>
                                        <Dropdown.Toggle className='anncellipsis' variant="link" id={`dropdown-${announcement._id}`} drop="down">
                                            &#x22EE; {/* Vertical ellipsis symbol */}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item as="button" className="notebtn" onClick={() => handleDelete(announcement._id)}>
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <p>{announcement.text}</p>
                                {announcement.link && (
                                    <p>
                                        <a href={announcement.link} target="_blank" rel="noopener noreferrer">
                                            {announcement.link}
                                        </a>
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default AnnouncementScreen;
