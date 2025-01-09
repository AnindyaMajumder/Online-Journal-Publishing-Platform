import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };

    const handleSearchSubmit = () => {
      navigate(`/search?query=${searchQuery}`);
    };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
        <Link to="/NewsfeedPage" >    
        <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600"> 
          Home
        </button>
        </Link>
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
            <Link to="/writepost" >
          <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600">Write</button>
            </Link>

          <Link to="/notification" >
          <button className="bg-black text-white p-2 rounded hover:bg-gray-600">Notification</button>
          </Link>
          
           <Link to="/profile" >
          <button className="bg-black text-white p-2 rounded hover:bg-gray-600">Profile</button>
           </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
