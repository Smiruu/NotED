import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  listTitles,
  updateFile,
  deleteFile,
  getFilesAndVideosByTitle,
} from "../actions/noteActions"; // Import other actions
import TitleList from "../components/titleList";
import Title from "../components/Title";
import AddFile from "../components/AddFile";
import { Button, Modal } from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core"; // Import PDF viewer components
import "@react-pdf-viewer/core/lib/styles/index.css"; // Import styles
import NavigationBar from "../components/NavigationBar";
import "./css/NoteScreen.css";
import { Dropdown } from "react-bootstrap";
import AddVideo from "../components/AddVideo";

function NoteScreen() {
  const dispatch = useDispatch();
  const { group_tag } = useParams(); // Get group_tag from URL parameters

  // Get files and titles from Redux state
  const {
    loading: loadingFiles,
    error: errorFiles,
    files,
  } = useSelector((state) => state.fileVideo); // Use the new fileVideo reducer
  const {
    loading: loadingTitles,
    error: errorTitles,
    titles,
  } = useSelector((state) => state.titleList);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileData, setFileData] = useState({
    titleId: "",
    section: "",
    file: null,
    text: "",
  });

  const pdfjsVersion = '3.0.279';
  const [titleId, setTitleId] = useState(
    localStorage.getItem("selectedTitleId") || null
  ); // Get the titleId from localStorage

  useEffect(() => {
    // Fetch titles when the component mounts or group_tag changes
    dispatch(listTitles(group_tag));
  }, [dispatch, group_tag]);

  useEffect(() => {
    // Fetch files and videos when the component mounts or titleId changes
    if (titleId) {
      dispatch(getFilesAndVideosByTitle(titleId));
    }
  }, [dispatch, titleId]);

  useEffect(() => {
    // Store the selected titleId in localStorage whenever it changes
    if (titleId) {
      localStorage.setItem("selectedTitleId", titleId);
    }

    // Cleanup function to remove the titleId from localStorage when the component unmounts
    return () => {
      localStorage.removeItem("selectedTitleId");
    };
  }, [titleId]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      dispatch(deleteFile(id, group_tag)); // Dispatch delete action
    }
  };

  const handleEditClick = (file) => {
    setSelectedFile(file);
    setFileData({
      titleId: file.title,
      section: file.section,
      file: null,
      text: file.text || "",
    });
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    const formData = new FormData();
    if (fileData.titleId) formData.append("title", fileData.titleId);
    formData.append("section", fileData.section || "");
    if (fileData.file) formData.append("file", fileData.file);
    formData.append("text", fileData.text || "");

    dispatch(updateFile(selectedFile._id, formData, group_tag));
    handleCloseEditModal();
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedFile(null);
    setFileData({ titleId: "", section: "", file: null, text: "" });
  };

  const renderFilePreview = (file) => {
    if (!file.file) return null;

    if (file.file.endsWith(".pdf")) {
      return (
        <div style={{ height: "400px", border: "1px solid #ccc" }}>
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={file.file} />
          </Worker>
        </div>
      );
    } else if (
      file.file.endsWith(".jpg") ||
      file.file.endsWith(".jpeg") ||
      file.file.endsWith(".png")
    ) {
      return (
        <img
          src={file.file}
          alt="Uploaded"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      );
    }
    return null;
  };

  return (
    <div className="note-screen-main">
      <NavigationBar />
      <div className="note-screen-content row">
        <h2 className="notes-title">Notes</h2>
        {/* Left Column for Titles */}
        <div className="col-md-3">
          <TitleList
            groupTag={group_tag}
            onSelectTitle={(id) => setTitleId(id)}
          />{" "}
          {/* Render the TitleList on the left */}
        </div>

        {/* Right Column for Notes and Files */}
        <div className="col-md-9">
          <div id="custom-container">
            <div className="add-actions">
              <div className="button-group">
                <AddFile
                  className="notes-button"
                  group_tag={group_tag}
                  titles={titles}
                />
              </div>
              <div className="button-group">
                <AddVideo
                  className="notes-button"
                  group_tag={group_tag}
                  titles={titles}
                />
              </div>
            </div>
          </div>

          {loadingFiles && <p>Loading files...</p>}
          {errorFiles && <p style={{ color: "red" }}>{errorFiles}</p>}
          {files && files.length === 0 && (
            <p>No files available for this title.</p>
          )}

          <ul className="list-group">
            {files &&
              files.map((file) => {
                const title = titles.find((t) => t._id === file.title);

                return (
                  <li key={file._id} className="list-group-item">
                    <div className="file-info">
                      <h6>{title ? title.name : "No Title"}</h6>
                      <Dropdown>
                        <Dropdown.Toggle
                          className="ellipsis"
                          variant="link"
                          id={`dropdown-${file._id}`}
                          drop="down"
                          style={{
                            padding: 0,
                            border: "none",
                            background: "none",
                          }}
                        >
                          &#x22EE;
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            as="button"
                            className="notebtn"
                            onClick={() => handleEditClick(file)}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            as="button"
                            className="notebtn"
                            onClick={() => handleDelete(file._id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                    <p>Section: {file.section}</p>
                    <p>
                      File:
                      {file.file && (
                        <a
                          href={file.file}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {file.file.split("/").pop()}
                        </a>
                      )}
                    </p>
                    <p> Text: {file.text || "No text"}</p>
                    {renderFilePreview(file)}
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
                <label htmlFor="titleId" className="form-label">
                  Select Title
                </label>
                <select
                  id="titleId"
                  className="form-select"
                  value={fileData.titleId}
                  onChange={(e) =>
                    setFileData({ ...fileData, titleId: e.target.value })
                  }
                  required
                >
                  <option value="">Select Title</option>
                  {titles &&
                    titles.map((title) => (
                      <option key={title._id} value={title._id}>
                        {title.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Text (Optional)
                </label>
                <textarea
                  id="text"
                  className="form-control"
                  value={fileData.text || ""}
                  onChange={(e) =>
                    setFileData({
                      ...fileData,
                      text: e.target.value === "" ? "" : e.target.value,
                    })
                  }
                  placeholder="Enter text"
                  rows={4}
                  style={{ resize: "vertical" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  Upload New File (Optional)
                </label>
                <input
                  type="file"
                  id="file"
                  accept=".pdf, .jpg, .jpeg, .png"
                  className="form-control"
                  onChange={(e) =>
                    setFileData({ ...fileData, file: e.target.files[0] })
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default NoteScreen;
