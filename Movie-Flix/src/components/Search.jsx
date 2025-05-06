import React from 'react';

const Search = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search">
      <div>
        <img src="search.svg" alt="search" />
        <input
          type="text"
          placeholder='Search for a Movie...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Search;