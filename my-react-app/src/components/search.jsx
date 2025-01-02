import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const SearchedItems = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchSearchResults = async () => {
      const query = new URLSearchParams(location.search).get('query');
      try {
        const response = await axios.get(`http://localhost:8000/search?query=${query}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {searchResults.length > 0 ? (
          searchResults.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded shadow mb-4">
                  <h3 className="text-xl font-bold">{post.title}</h3>
                  <p className="text-gray-600">by {post.author} on {post.publishedDate.split('T')[0]} at {post.publishedDate.split('T')[1].split('.')[0]}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchedItems;