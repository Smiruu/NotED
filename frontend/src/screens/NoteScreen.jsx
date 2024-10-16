import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getGroupDetails,
} from "../actions/groupActions";

import {
  listTitles,
  updateFile,
  deleteFile,
  updateVideo,
  deleteVideo,
  getFilesAndVideosByTitle,
} from "../actions/noteActions"; // Import other actions
import TitleList from "../components/titleList";
import Title from "../components/Title";
import AddFile from "../components/AddFile";
import { Button, Modal, Dropdown } from "react-bootstrap";
import { Worker, Viewer } from "@react-pdf-viewer/core"; // Import PDF viewer components
import "@react-pdf-viewer/core/lib/styles/index.css"; // Import styles
import NavigationBar from "../components/NavigationBar";
import "./css/NoteScreen.css";
import AddVideo from "../components/AddVideo";

function NoteScreen() {
  const dispatch = useDispatch();
  const { group_tag } = useParams(); // Get group_tag from URL parameters
  const groupDetails = useSelector((state) => state.groupDetails);
  const { group, loading, error } = groupDetails;

  const user = useSelector((state) => state.userLogin.userInfo);
  const [isCreator, setIsCreator] = useState(false);

  useEffect(() => {
    if (group && user) {
      setIsCreator(group.creator?.user_tag === user.token?.user_tag); // Use optional chaining
    }
  }, [group, user]);
  

  // Get files and titles from Redux state
  const {
    loading: loadingFiles,
    error: errorFiles,
    files,
    videos, // Added to get videos
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

  const pdfjsVersion = '2.16.105';
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

  const [showVideoEditModal, setShowVideoEditModal] = useState(false);
const [selectedVideo, setSelectedVideo] = useState(null);
const [videoData, setVideoData] = useState({
  titleId: "",
  link: "",
  video: null,
});

// Function to handle video edit click
const handleVideoEditClick = (video) => {
  setSelectedVideo(video);
  setVideoData({
    titleId: video.title,
    link: video.link || "",
    video: null,
  });
  setShowVideoEditModal(true);
};

// Function to handle video delete
const handleVideoDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this video?")) {
    dispatch(deleteVideo(id, group_tag)); // Dispatch delete action
  }
};

// Function to handle video edit submit
const handleVideoEditSubmit = () => {
  const formData = new FormData();
  if (videoData.titleId) formData.append("title", videoData.titleId);
  formData.append("link", videoData.link || "");
  if (videoData.video) formData.append("video", videoData.video);

  dispatch(updateVideo(selectedVideo._id, formData, group_tag));
  handleCloseVideoEditModal();
};

// Function to close video edit modal
const handleCloseVideoEditModal = () => {
  setShowVideoEditModal(false);
  setSelectedVideo(null);
  setVideoData({ titleId: "", link: "", video: null });
};

  return (
    <div className="note-screen-main">
      <NavigationBar />
      <div className="header">
            <div className="header-contents">
              {group?.group_image && (
                <img
                  src={group.group_image}
                  alt="Group"
                  style={{ width: "50px", height: "50px", marginRight: "10px" }}
                />
              )}
              Group: {group?.name} #{group?.group_tag}
            </div>
            <div className="header-links">
              <a
                 href={`/groups/${group_tag}/announcements`}
                className="header-button"
              >
                Announcements
              </a>
              <a href={`/groups/${group_tag}/chat`} className="header-button">
                Chat
              </a>
              <a href={`/groups/${group_tag}/notes`} className="header-button">
                Notes
              </a>
              {isCreator && (
                <a href={`/groups/${group_tag}/edit`} className="header-button">
                  Edit Group
                </a>
              )}
            </div>
          </div>
      <div className="note-screen-content row">
      {/* <h2>Files</h2> */}
        {/* Left Column for Titles */}
        <div className="col-md-3">
      <div className="title-container">
        <TitleList
          groupTag={group_tag}
          onSelectTitle={(id) => setTitleId(id)}
        />
      </div>
    </div>

        {/* Right Column for Notes and Files */}
        <div className="col-md-9">
          <div id="custom-container">
            <h2 className="notes-title">Notes</h2>
            <div className="add-actions">
              <div className="button-group">
                <AddFile
                  className="notes-button"
                  group_tag={group_tag}
                  titles={titles}
                />
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

<div className="list-container">
        <ul className="list-group">
  {files &&
    files.map((file) => {
      const title = titles.find((t) => t._id === file.title);

      return (
        <li key={file._id} className="notes-list-group-item">
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
                className="notesfile"
              >
                {file.file.split("/").pop()}
              </a>
            )}
          </p>
          <p>Text: {file.text || "No text"}</p>
          {renderFilePreview(file)}
        </li>
      );
    })}
</ul>



{/* Render Videos if available */}
<ul className="list-group">
{videos && videos.length > 0 && (
  videos.map((video) => {
    const title = titles.find((t) => t._id === video.title); // Find the title by ID

    return (
      <li key={video._id} className="notes-list-group-item">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">{title ? title.name : "No Title"}</h6>
          <Dropdown>
            <Dropdown.Toggle
              className="ellipsis"
              variant="link"
              id={`dropdown-${video._id}`}
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
                onClick={() => handleVideoEditClick(video)}
              >
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                as="button"
                className="notebtn"
                onClick={() => handleVideoDelete(video._id)}
              >
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <p>
          Link:  
          {video.link && (
            <a href={video.link} target="_blank" rel="noopener noreferrer">
              {video.link.split("/").pop()}
            </a>
          )}
        </p>
        {video.video && (
          <video controls width="100%" height="auto">
            <source src={video.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </li>
    );
  })
)}
</ul>
</div>


{/* Video Edit Modal */}
<Modal show={showVideoEditModal} onHide={handleCloseVideoEditModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Video</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="mb-3">
      <label htmlFor="videoTitleId" className="form-label">
        Title
      </label>
      <select
        id="videoTitleId"
        value={videoData.titleId}
        onChange={(e) =>
          setVideoData({ ...videoData, titleId: e.target.value })
        }
        className="form-select"
      >
        <option value="">Select Title</option>
        {titles.map((title) => (
          <option key={title._id} value={title._id}>
            {title.name}
          </option>
        ))}
      </select>
    </div>
    <div className="mb-3">
      <label htmlFor="videoLink" className="form-label">
        Video Link
      </label>
      <input
        type="text"
        id="videoLink"
        className="form-control"
        value={videoData.link}
        onChange={(e) =>
          setVideoData({ ...videoData, link: e.target.value })
        }
      />
    </div>
    <div className="mb-3">
      <label htmlFor="video" className="form-label">
        Video File
      </label>
      <input
        type="file"
        id="video"
        className="form-control"
        onChange={(e) =>
          setVideoData({ ...videoData, video: e.target.files[0] })
        }
      />
    </div>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseVideoEditModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleVideoEditSubmit}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>



          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit File</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <label htmlFor="titleId" className="form-label">
                Title
                </label>
                <select
                  id="titleId"
                  value={fileData.titleId}
                  onChange={(e) =>
                    setFileData({ ...fileData, titleId: e.target.value })
                  }
                  className="form-select"
                >
                  <option value="">Select Title</option>
                  {titles.map((title) => (
                    <option key={title._id} value={title._id}>
                      {title.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="section" className="form-label">
                  Section
                </label>
                <input
                  type="text"
                  id="section"
                  className="form-control"
                  value={fileData.section}
                  onChange={(e) =>
                    setFileData({ ...fileData, section: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="file" className="form-label">
                  File
                </label>
                <input
                  type="file"
                  id="file"
                  className="form-control"
                  onChange={(e) =>
                    setFileData({ ...fileData, file: e.target.files[0] })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="text" className="form-label">
                  Description/Text
                </label>
                <textarea
                  id="text"
                  className="form-control"
                  rows="3"
                  value={fileData.text}
                  onChange={(e) =>
                    setFileData({ ...fileData, text: e.target.value })
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

                 
              