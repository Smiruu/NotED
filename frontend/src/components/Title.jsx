import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
    listTitles,
    createTitle,
    updateTitle,
    deleteTitle,
} from '../actions/noteActions';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button components

const Title = () => {
    const dispatch = useDispatch();
    const { group_tag } = useParams();

    // State to manage title modal visibility and inputs
    const [titleInput, setTitleInput] = useState('');
    const [editingTitleId, setEditingTitleId] = useState(null);
    const [showModal, setShowModal] = useState(false); // Modal visibility state

    // Access titles and loading state from the Redux store
    const titleList = useSelector((state) => state.titleList);
    const { loading, error, titles } = titleList;

    useEffect(() => {
        // Dispatch action to list titles on component mount
        dispatch(listTitles(group_tag));
    }, [dispatch, group_tag]);

    const handleOpen = (title = null) => {
        if (title) {
            setTitleInput(title.name);
            setEditingTitleId(title._id);
        } else {
            setTitleInput('');
            setEditingTitleId(null);
        }
        setShowModal(true); // Open the modal
    };

    const handleClose = () => setShowModal(false); // Close the modal

    const handleSubmit = () => {
        if (editingTitleId) {
            dispatch(updateTitle(editingTitleId, { name: titleInput }, group_tag));
        } else {
            dispatch(createTitle(group_tag, { name: titleInput }));
        }
        handleClose(); // Close the modal after submission
    };

    const handleDelete = (_id) => {
        dispatch(deleteTitle(_id, group_tag)); // Use _id for deletion
    };

    // Function to reset the modal to the creation state
    const handleBack = () => {
        setTitleInput('');
        setEditingTitleId(null);
    };

    return (
        <div>
            <Button variant="primary" onClick={() => handleOpen()}>Add Title</Button>

            {/* Modal for creating, editing, and displaying titles */}
            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editingTitleId ? 'Edit Title' : 'Add Title'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        value={titleInput}
                        onChange={(e) => setTitleInput(e.target.value)}
                        placeholder="Enter title name"
                        className="form-control mb-3"
                    />
                    <h5>Existing Titles:</h5>
                    {loading && <p>Loading titles...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <ul className="list-group">
                        {titles && titles.map((title) => (
                            <li key={title._id} className="list-group-item d-flex justify-content-between align-items-center">
                                {title.name}
                                <div>
                                    <Button variant="warning" onClick={() => handleOpen(title)} className="me-2">Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(title._id)}>Delete</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    {editingTitleId ? (
                        <Button variant="secondary" onClick={handleBack}>
                            Back
                        </Button>
                    ) : (
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    )}
                    <Button variant="primary" onClick={handleSubmit}>
                        {editingTitleId ? 'Update Title' : 'Create Title'}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default Title;
