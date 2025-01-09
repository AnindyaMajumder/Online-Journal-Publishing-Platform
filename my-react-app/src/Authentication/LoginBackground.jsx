import React from "react";
import Pic1 from "../image/pic1.jpg"; // Import the background image
import Header from "../components/Header.jsx";

export default function LoginBackground({ children }) {
  return (
    <div className="bg-yellow-20 min-h-center">
      <Header /> {/* Use Header here */}
      <hr className="mt-4 border-gray-900" />
      <div className="relative h-[calc(100vh-100px)]">
        <img
          src={Pic1}
          alt="Blogger Paradise Background"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center text-black">
          <h1 className="text-5xl font-bold animate-bounce">Stories</h1>
          <h1 className="text-5xl font-bold mt-4 animate-bounce"> & </h1>
          <h1 className="text-5xl font-bold mt-4 animate-bounce">Ideas</h1>
        </div>
      </div>
      {children}
    </div>
  );
}
