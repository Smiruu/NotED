import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { createAnnouncement } from '../actions/announcementActions'; // Adjust import based on your file structure

const CreateAnnouncement = ({ group_tag }) => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');

    const handleSubmit = () => {
        // Check if title is provided
        if (!title) {
            alert("Title is required."); // Alert user if title is not provided
            return; // Prevent submission
        }

        const announcementData = {
            title,
            text,
            link,
        };

        dispatch(createAnnouncement(group_tag, announcementData));
        handleClose();
    };

    const handleClose = () => {
        setShowModal(false);
        setTitle(''); // Reset title
        setText(''); // Reset text
        setLink(''); // Reset link
    };

    return (
        <div>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                Create Announcement
            </Button>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Create Announcement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Title Input */}
                    <div className="mb-3">
                        <label htmlFor="announcementTitle" className="form-label">Title</label>
                        <input
                            type="text"
                            id="announcementTitle"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Text Area for Announcement */}
                    <div className="mb-3">
                        <label htmlFor="announcementText" className="form-label">Content</label>
                        <textarea
                            id="announcementText"
                            className="form-control"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Enter your announcement here"
                            rows={3} // Set the initial number of visible rows
                            style={{ resize: 'vertical' }} // Allow vertical resizing
                            required
                        />
                    </div>

                    {/* Link Input (Optional) */}
                    <div className="mb-3">
                        <label htmlFor="announcementLink" className="form-label">Link</label>
                        <input
                            type="url"
                            id="announcementLink"
                            className="form-control"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Enter a link (if any)"
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Create Announcement
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CreateAnnouncement;
