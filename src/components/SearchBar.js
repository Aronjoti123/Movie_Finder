import React, { useState } from "react";

function SearchBar({ setQuery }) {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setQuery(value || "avengers");
  };

  const handleClear = () => {
    setSearchInput("");
    setQuery("avengers");
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search movies, actors, plots..."
          value={searchInput}
          onChange={handleChange}
          className="search-input"
        />
        {searchInput && (
          <button className="clear-btn" onClick={handleClear}>✕</button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
