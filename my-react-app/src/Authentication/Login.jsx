import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ForgotPassword from "./ForgotPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isResetPasswordOpen, setResetPasswordOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if the username and password are "admin"
    if (username === "admin" && password === "admin") {
      try {
        const response = await axios.post(
          "http://localhost:8000/admin-login",
          { username, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const token = response.data;
        if (token) {
          localStorage.setItem("adminAuthToken", token);
          navigate("/admin");
        } else {
          throw new Error("No token returned from the server.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Admin login failed. Please try again."
        );
      }
      return;
    }

    // Handle regular user login
    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data;
      if (token) {
        localStorage.setItem("authToken", token);
        navigate("/NewsfeedPage");
      } else {
        throw new Error("No token returned from the server.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
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
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
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
              onClick={() => navigate(-1)}
              className="w-full mt-2 px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:underline">
            Don't have an account? Register
          </Link>
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => setForgotPasswordOpen(true)}
            className="text-sm text-gray-700 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <ForgotPassword
          onClose={() => setForgotPasswordOpen(false)}
          onNext={() => setResetPasswordOpen(true)}
        />
      )}

      {/* Reset Password Modal */}
      {isResetPasswordOpen && (
        <ResetPassword onClose={() => setResetPasswordOpen(false)} />
      )}
    </div>
  );
}
