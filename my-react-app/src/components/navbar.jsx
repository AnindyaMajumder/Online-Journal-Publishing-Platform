import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { Link } from 'react-router-dom';
import logo from '../assets/demo.webp';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
      };
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
        <Link to="/" >    
        <button className="bg-gray-100 text-gray-700 px-2 py-2 rounded-lg hover:bg-gray-200"> 
          <img src={logo} alt="Logo" className="h-20 w-20" />
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
                className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                onClick={() => console.log("Searching for", searchQuery)}
              >
                Search
              </button>
            </div>

        {/* Buttons */}
        <div className="flex items-center space-x-4">
            <Link to="/writepost" >
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Write</button>
            </Link>

          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">Notification</button>
          <Link to="/profile" >
          
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">Profile</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
