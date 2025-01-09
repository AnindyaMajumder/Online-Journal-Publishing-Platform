import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/search?query=${searchQuery}`);
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigateTo("/NewsfeedPage")}
          >
            Home
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-grow mx-4">
          <input
            type="text"
            placeholder="Search journals..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-600"
          />
          <button
            className="bg-black text-white p-2 rounded hover:bg-gray-600"
            onClick={handleSearchSubmit}
          >
            Search
          </button>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            onClick={() => navigateTo("/writepost")}
          >
            Write
          </button>
          <button
            className="bg-black text-white p-2 rounded hover:bg-gray-600"
            onClick={() => navigateTo("/profile")}
          >
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
