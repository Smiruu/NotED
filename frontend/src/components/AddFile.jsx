import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { createFile } from '../actions/noteActions'; // Import the createFile action

const AddFile = ({ group_tag, titles }) => {
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const [titleId, setTitleId] = useState(''); // Separate state for title
    const [fileEntries, setFileEntries] = useState([{ section: '', file: null, text: '' }]); // Add text field to state

    const handleChangeTitle = (e) => {
        setTitleId(e.target.value); // Update the titleId state
    };

    const handleChangeFileEntry = (index, e) => {
        const { name, value, files } = e.target;
        const updatedEntries = [...fileEntries];

        if (name === 'file') {
            updatedEntries[index].file = files[0]; // Update the file for the corresponding index
        } else {
            updatedEntries[index][name] = value; // Update section or text for the corresponding index
        }

        setFileEntries(updatedEntries);
    };

    const handleAddAnotherFile = () => {
        setFileEntries([...fileEntries, { section: '', file: null, text: '' }]); // Add a new empty entry
    };

    const handleSubmit = () => {
        // Prepare an array to hold FormData instances for each file entry
        const allFileData = fileEntries.map((entry) => {
            const fileData = new FormData();
            if (titleId) {
                fileData.append('title', titleId); // Append title only once for each file model
            }
            if (entry.section) {
                fileData.append('section', entry.section);
            }
            if (entry.file) {
                fileData.append('file', entry.file);
            }
            if (entry.text) {
                fileData.append('text', entry.text); // Append the text field
            }
            return fileData;
        });

        // Dispatch createFile action for each file data
        allFileData.forEach((fileData) => {
            dispatch(createFile(group_tag, fileData));
        });

        handleClose();
    };

    const handleClose = () => {
        setShowModal(false);
        setTitleId(''); // Reset titleId to an empty string
        setFileEntries([{ section: '', file: null, text: '' }]); // Reset to one empty entry
    };

    return (
        <div>
            <Button onClick={() => setShowModal(true)}>
                Add File
            </Button>

            <Modal show={showModal} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add File(s)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Title Selection */}
                    <div className="mb-3">
                        <label htmlFor="titleId" className="form-label">Select Title</label>
                        <select
                            id="titleId"
                            className="form-select"
                            value={titleId}
                            onChange={handleChangeTitle}
                            required
                        >
                            <option value="">Select Title</option>
                            {titles && titles.map((title) => (
                                <option key={title._id} value={title._id}>
                                    {title.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {fileEntries.map((entry, index) => (
                        <div key={index} className="mb-3">
                            {/* Section Number (Optional) */}

                            {/* Text Area for Additional Text */}
                            <label htmlFor={`text_${index}`} className="form-label"> Text (Optional)</label>
                            <textarea
                                id={`text_${index}`}
                                name="text"
                                className="form-control"
                                value={entry.text}
                                onChange={(e) => handleChangeFileEntry(index, e)}
                                placeholder="Enter text"
                                rows={3} // Set the initial number of visible rows
                                style={{ resize: 'vertical' }} // Allow vertical resizing
                            />

                            {/* File Upload */}
                            <label htmlFor={`file_${index}`} className="form-label">Upload File (Optional)</label>
                            <input
                                type="file"
                                id={`file_${index}`}
                                name="file"
                                accept=".pdf, .jpg, .jpeg, .png"
                                className="form-control"
                                onChange={(e) => handleChangeFileEntry(index, e)}
                                required
                            />
                        </div>
                    ))}

                    {/* Add Another File Button */}
                    <Button variant="secondary" onClick={handleAddAnotherFile}>
                        Add Another File
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Add File(s)
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddFile;
