import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import { listTitles } from "../actions/noteActions"; // Ensure you have the correct path for your action
import './css/TitleList.css'; // Import the CSS file
import AddVideo from "../components/AddVideo";


const TitleList = ({ groupTag, onSelectTitle }) => { // Add onSelectTitle as a prop
    const dispatch = useDispatch();

    // Use Redux state to get the title list, loading, and error status
    const titleList = useSelector((state) => state.titleList);
    const { loading, error, titles } = titleList;

    useEffect(() => {
        dispatch(listTitles(groupTag)); // Fetch titles based on the group tag
    }, [dispatch, groupTag]);

    return (
        <div>
            {/* Flexbox container for "Section" heading and Title component */}
            <div className="title-list-header">
                <h1>Section</h1>
                <Title group_tag={groupTag} /> {/* Place Title component beside Section */}
            </div>

            {loading ? (
                <p>Loading...</p> // Simple loading text instead of a loader
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p> // Show error message as plain text
            ) : (
                <ul className="list-group">
                    {titles && titles.map((title) => (
                        <li 
                            key={title._id} 
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onClick={() => onSelectTitle(title._id)} // Call the onSelectTitle prop with the title ID
                            style={{ cursor: "pointer" }} // Change cursor to pointer for better UX
                        >
                            {title.name}    
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TitleList;
