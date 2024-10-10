import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listFiles, listTitles, updateFile, deleteFile } from '../actions/noteActions'; // Import actions
import Title from '../components/Title';
import AddFile from '../components/AddFile';
import { Button, Modal } from 'react-bootstrap';
import { Worker, Viewer } from '@react-pdf-viewer/core'; // Import PDF viewer components
import '@react-pdf-viewer/core/lib/styles/index.css'; // Import styles

function NoteScreen() {
    const dispatch = useDispatch();
    const { group_tag } = useParams(); // Get the group_tag from URL parameters

    // Get files and titles from Redux state
    const { loading: loadingFiles, error: errorFiles, files } = useSelector((state) => state.fileList);
    const { loading: loadingTitles, error: errorTitles, titles } = useSelector((state) => state.titleList);

    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileData, setFileData] = useState({ titleId: '', section: '', file: null, text: '' }); // Include text field

    // Set the matching PDF.js version
    const pdfjsVersion = '2.7.570'; // Ensure this matches the installed version

    useEffect(() => {
        // Fetch files and titles when the component mounts or group_tag changes
        dispatch(listFiles(group_tag));
        dispatch(listTitles(group_tag));
    }, [dispatch, group_tag]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this file?')) {
            dispatch(deleteFile(id, group_tag)); // Dispatch delete action
        }
    };

    const handleEditClick = (file) => {
        setSelectedFile(file);
        setFileData({
            titleId: file.title, // Use title._id directly
            section: file.section,
            file: null,
            text: file.text || '' // Add text field initialization
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = () => {
        const formData = new FormData();
        if (fileData.titleId) formData.append('title', fileData.titleId);
        formData.append('section', fileData.section || ''); // Allow section to be empty
        if (fileData.file) formData.append('file', fileData.file);
        formData.append('text', fileData.text || ''); // Allow text to be empty

        dispatch(updateFile(selectedFile._id, formData, group_tag)); // Dispatch update action
        handleCloseEditModal(); // Close the modal
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedFile(null);
        setFileData({ titleId: '', section: '', file: null, text: '' }); // Reset form data
    };

    // Function to render file previews
    const renderFilePreview = (file) => {
        if (!file.file) return null;

        if (file.file.endsWith('.pdf')) {
            return (
                <div style={{ height: '400px', border: '1px solid #ccc' }}>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
                        <Viewer fileUrl={file.file} />
                    </Worker>
                </div>
            );
        } else if (file.file.endsWith('.jpg') || file.file.endsWith('.jpeg') || file.file.endsWith('.png')) {
            return <img src={file.file} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />;
        }
        return null;
    };

    return (
        <div>
            <Title />
            <AddFile group_tag={group_tag} titles={titles} />
            <h2>Files</h2>

            {loadingFiles && <p>Loading files...</p>}
            {errorFiles && <p style={{ color: 'red' }}>{errorFiles}</p>}
            {files && files.length === 0 && <p>No files available for this group.</p>}

            <ul className="list-group">
                {files && files.map((file) => {
                    // Find the title corresponding to the file's titleId
                    const title = titles.find(t => t._id === file.title); // Assuming file.title holds the title ID

                    return (
                        <li key={file._id} className="list-group-item">
                            <h6>{title ? title.name : 'No Title'}</h6> {/* Display the title name */}
                            <p>Section: {file.section}</p>
                            <p>
                                File: 
                                {file.file && (
                                    <a href={file.file} target="_blank" rel="noopener noreferrer">
                                        {file.file.split('/').pop()}
                                    </a>
                                )}
                            </p>
                            <p> Text: {file.text || 'No text'}</p> {/* Display additional text */}
                            {renderFilePreview(file)} {/* Render file preview */}
                            <Button variant="warning" onClick={() => handleEditClick(file)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(file._id)}>Delete</Button>
                        </li>
                    );
                })}
            </ul>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="titleId" className="form-label">Select Title</label>
                        <select
                            id="titleId"
                            className="form-select"
                            value={fileData.titleId}
                            onChange={(e) => setFileData({ ...fileData, titleId: e.target.value })}
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
                    <div className="mb-3">
                        <label htmlFor="section" className="form-label">Section Number (Optional)</label>
                        <input
                            type="number"
                            id="section"
                            className="form-control"
                            value={fileData.section || ''} // Display empty string if section is null
                            onChange={(e) => setFileData({ ...fileData, section: e.target.value === '' ? '' : e.target.value })}
                            placeholder="Enter Section Number"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Text (Optional)</label>
                        <textarea
                            id="text"
                            className="form-control"
                            value={fileData.text || ''} // Display empty string if text is null
                            onChange={(e) => setFileData({ ...fileData, text: e.target.value === '' ? '' : e.target.value })}
                            placeholder="Enter text"
                            rows={4}
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file" className="form-label">Upload New File (Optional)</label>
                        <input
                            type="file"
                            id="file"
                            accept=".pdf, .jpg, .jpeg, .png"
                            className="form-control"
                            onChange={(e) => setFileData({ ...fileData, file: e.target.files[0] })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                    <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default NoteScreen;
