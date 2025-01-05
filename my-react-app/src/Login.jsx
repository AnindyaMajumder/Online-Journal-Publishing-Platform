import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate(); // Use navigate for routing

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <form method="POST">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)} // Navigate back to the previous page
              className="w-full mt-2 px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-4">
          <Link to="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}
