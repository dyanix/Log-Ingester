// pages/index.js

"use client"
import React, { useState } from 'react';

function App() {
  const [searchParams, setSearchParams] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestampStart: '',
    timestampEnd: '',
    traceId: '',
    spanId: '',
    commit: '',
    parentResourceId: '',
  });

  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3001/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      });

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
      <h1>Log Search</h1>
      <div>
        <label>
          Level:
          <input className='text-black' type="text" name="level" value={searchParams.level} onChange={handleInputChange} />
        </label>
        {/* Add similar input fields for other search parameters */}
      </div>
      <button onClick={handleSearch}>Search</button>

      <div>
        <h2>Search Results:</h2>
        <ul className='text-white'>
          {searchResults.map((log, index) => (
            <li key={index}>{JSON.stringify(log)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
