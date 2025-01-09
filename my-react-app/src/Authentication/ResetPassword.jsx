import React, { useState } from "react";
import axios from "axios";

export default function ResetPassword({ onClose }) {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/reset-password", {
        email,
        resetCode,
        username,
        password,
      });

      setMessage(response.data.message || "Password successfully reset.");
      setError(null);

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        onClose(); // Close the reset password modal
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password.");
      setMessage("");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Reset Password
        </h2>
        {message && <div className="text-green-500 text-sm mb-4">{message}</div>}
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="resetCode"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Reset Code
            </label>
            <input
              type="text"
              id="resetCode"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter reset code"
              required
            />
          </div>
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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter new password"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
            >
              Reset
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
