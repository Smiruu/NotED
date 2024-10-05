// components/SearchBar.js
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        onSearch(value); // Pass the input value to the parent component
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search chats..."
                value={inputValue}
                onChange={handleChange}
            />
        </div>
    );
};

export default SearchBar;
