import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listVideos, deleteVideo, updateVideo } from '../actions/noteActions';
import { listTitles } from '../actions/noteActions';
import { Button, Modal } from 'react-bootstrap';
import Title from '../components/Title';
import AddVideo from '../components/AddVideo';

const VideoScreen = () => {
    const dispatch = useDispatch();
    const { group_tag } = useParams();

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [formData, setFormData] = useState({ title: '', link: '', video: null });

    const videoList = useSelector((state) => state.videoList);
    const { loading: loadingVideos, error: errorVideos, videos } = videoList;

    const titleList = useSelector((state) => state.titleList);
    const { loading: loadingTitles, error: errorTitles, titles } = titleList;

    useEffect(() => {
        dispatch(listVideos(group_tag));
        dispatch(listTitles(group_tag));
    }, [dispatch, group_tag]);

    const handleOpenAdd = () => setShowAddModal(true);
    const handleCloseAdd = () => setShowAddModal(false);

    const handleOpenEdit = (video) => {
        setCurrentVideo(video);
        setFormData({
            title: video.title,
            link: video.link || '',
            video: null,
        });
        setShowEditModal(true);
    };

    const handleCloseEdit = () => {
        setShowEditModal(false);
        setCurrentVideo(null);
        setFormData({ title: '', link: '', video: null });
    };

    const handleDelete = (_id) => {
        dispatch(deleteVideo(_id, group_tag));
    };

    const handleUpdateVideo = (e) => {
        e.preventDefault();
        const updatedVideoData = new FormData();
        updatedVideoData.append('title', formData.title);
        updatedVideoData.append('link', formData.link);
        if (formData.video) {
            updatedVideoData.append('video', formData.video);
        }
        dispatch(updateVideo(currentVideo._id, updatedVideoData, group_tag));
        handleCloseEdit();
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'video') {
            setFormData({ ...formData, video: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Function to remove the video
    const handleRemoveVideo = () => {
        setFormData({ ...formData, video: null });
    };

    // Function to remove the link
    const handleRemoveLink = () => {
        setFormData({ ...formData, link: '' });
    };

    return (
        <div>
            <Title />

            <Button variant="primary" onClick={handleOpenAdd}>Add Video</Button>

            {/* Video Component for adding videos */}
            <AddVideo showModal={showAddModal} handleClose={handleCloseAdd} titles={titles} group_tag={group_tag} />

            {/* Edit Video Modal */}
            <Modal show={showEditModal} onHide={handleCloseEdit} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Video</Modal.Title>
                </Modal.Header>
                <Modal.Body>
    <div>
        <select
            value={formData.title}
            onChange={handleChange}
            name="title"
            className="form-control mb-3"
        >
            <option value="">Select Title</option>
            {titles.map((title) => (
                <option key={title._id} value={title._id}>
                    {title.name}
                </option>
            ))}
        </select>
        <div className="mb-3">
            <input
                type="text"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Enter video link"
                className="form-control"
            />
            <Button variant="danger" onClick={handleRemoveLink} className="mt-2">Remove Link</Button>
        </div>
        <div className="mb-3">
            <input
                type="file"
                name="video"
                accept="video/mp4"
                onChange={handleChange}
                className="form-control"
            />
            {formData.video && (
                <div className="d-flex justify-content-between align-items-center mt-2">
                    {/* Remove the Remove Video button here */}
                </div>
            )}
        </div>
    </div>
</Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateVideo}>Update Video</Button>
                </Modal.Footer>
            </Modal>

            <h5>Existing Videos:</h5>
            <ul className="list-group">
                {loadingVideos && <p>Loading videos...</p>}
                {errorVideos && <p style={{ color: 'red' }}>{errorVideos}</p>}
                {loadingTitles && <p>Loading titles...</p>}
                {errorTitles && <p style={{ color: 'red' }}>{errorTitles}</p>}
                {titles && titles.map((title) => {
                    const titleVideos = videos.filter(video => video.title === title._id);
                    return titleVideos.length > 0 ? (
                        <li key={title._id} className="list-group-item">
                            <h6>{title.name}</h6>
                            {titleVideos.map((video) => (
                                <div key={video._id} className="d-flex flex-column justify-content-between align-items-start mb-2">
                                    <div className="d-flex justify-content-between w-100 align-items-center">
                                        <div>
                                            {video.video && (
                                                <video width="800" height="480" controls>
                                                <source src={video.video} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            )}
                                        </div>
                                        <div>
                                            <Button variant="warning" onClick={() => handleOpenEdit(video)}>Edit</Button>
                                            <Button variant="danger" onClick={() => handleDelete(video._id)}>Delete</Button>
                                        </div>
                                    </div>
                                    <div>
                                        {video.link && <p>Link: <a href={video.link} target="_blank" rel="noopener noreferrer">{video.link}</a></p>}
                                    </div>
                                </div>
                            ))} 
                        </li>
                    ) : null;
                })}
            </ul>
        </div>
    );
};

export default VideoScreen;
