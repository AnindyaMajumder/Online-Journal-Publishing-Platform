import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword({ onClose, onNext }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Retrieve the auth token

    if (!token) {
      setError("You need to be logged in to reset your password.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/forget-password",
        {
          username,
           // Send the token for authentication
        }
      );

      setMessage(response.data.message || "Reset code sent to your email.");
      setError("");
      onNext(); // Proceed to reset password popup
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset code.");
      setMessage("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Forgot Password
        </h2>
        {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleForgotPassword}>
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
            >
              Next
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-red-500 text-white text-base font-medium rounded-full hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
