import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between text-3xl text-gray-950 p-4">
      {/* Blogger Paradise Title */}
      <div className="flex space-x-1">
        <span className="inline-block mr-1 font-bold">NAIS</span>
        <span className="inline-block font-bold">Journal</span>
      </div>

      {/* Left-side links */}
      <div className="flex space-x-3 ml-auto">
        <a href="#our-story" className="text-gray-500 text-sm font-bold hover:underline">
          Our Story
        </a>
        <a href="#Membership" className="text-gray-500 text-sm font-bold hover:underline">
          Membership&nbsp;&nbsp;
        </a>
      </div>

      {/* Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
        >
          Register
        </button>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
