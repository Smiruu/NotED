// Video.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createVideo } from '../actions/noteActions';

const AddVideo = ({ showModal, handleClose, titles, group_tag }) => {
    const dispatch = useDispatch();
    const [videoInput, setVideoInput] = useState({ titleId: '', links: [''], videos: [''] });

    const handleFileChange = (index, e) => {
        const newVideos = [...videoInput.videos];
        newVideos[index] = e.target.files[0];
        setVideoInput({ ...videoInput, videos: newVideos });
    };

    const handleAddFileInput = () => {
        setVideoInput({ ...videoInput, videos: [...videoInput.videos, ''] });
    };

    const handleLinkChange = (index, value) => {
        const newLinks = [...videoInput.links];
        newLinks[index] = value;
        setVideoInput({ ...videoInput, links: newLinks });
    };

    const handleAddLink = () => {
        setVideoInput({ ...videoInput, links: [...videoInput.links, ''] });
    };

    const handleRemoveLink = (index) => {
        const newLinks = videoInput.links.filter((_, i) => i !== index);
        setVideoInput({ ...videoInput, links: newLinks });
    };

    const handleClearLink = (index) => {
        const newLinks = [...videoInput.links];
        newLinks[index] = '';
        setVideoInput({ ...videoInput, links: newLinks });
    };

    const handleSubmit = () => {
        videoInput.videos.forEach((videoFile) => {
            if (videoFile) {
                const formData = new FormData();
                formData.append('title', videoInput.titleId);
                formData.append('video', videoFile);
                dispatch(createVideo(group_tag, formData));
            }
        });

        videoInput.links.forEach((link) => {
            if (link) {
                const formData = new FormData();
                formData.append('title', videoInput.titleId);
                formData.append('link', link);
                dispatch(createVideo(group_tag, formData));
            }
        });

        setVideoInput({ titleId: '', links: [''], videos: [''] });
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Add Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <select
                        value={videoInput.titleId}
                        onChange={(e) => setVideoInput({ ...videoInput, titleId: e.target.value })}
                        className="form-control mb-3"
                    >
                        <option value="">Select Title</option>
                        {titles && titles.map((title) => (
                            <option key={title._id} value={title._id}>{title.name}</option>
                        ))}
                    </select>
                    {videoInput.links.map((link, index) => (
                        <div key={index} className="mb-3 d-flex align-items-center">
                            <input
                                type="url"
                                value={link}
                                onChange={(e) => handleLinkChange(index, e.target.value)}
                                placeholder="Enter video link"
                                className="form-control me-2"
                            />
                            <Button variant="danger" onClick={() => handleRemoveLink(index)}>Remove</Button>
                        </div>
                    ))}
                    <Button variant="secondary" onClick={handleAddLink} className="mb-3">Add Another Link</Button>
                    
                    {videoInput.videos.map((video, index) => (
                        <div key={index} className="mb-3">
                            <input
                                type="file"
                                accept="video/mp4"
                                onChange={(e) => handleFileChange(index, e)}
                                className="form-control mb-2"
                            />
                        </div>
                    ))}
                    <Button variant="secondary" onClick={handleAddFileInput} className="mb-3">Add Another Video</Button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create Video
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddVideo;
