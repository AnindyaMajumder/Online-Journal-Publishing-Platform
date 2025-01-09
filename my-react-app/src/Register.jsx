import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    bio: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/register", {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
      });

      console.log("API Response: ", response); // Log API response

      if (response.status === 200) {
        const token = response.data.token; // Assuming the token is returned in the `token` field
        localStorage.setItem("authToken", token); // Store the token in localStorage

        setSuccessMessage("Registration Successful! Proceed to login.");
        // Hide the success message after 2 seconds and navigate to login
        setTimeout(() => {
          setSuccessMessage(null); // Clear the success message
          navigate("/login"); // Navigate to login page
        }, 2000);
      } else if (response.status === 400) {
        setError("User already exists. Please try a different username.");
      }
    } catch (err) {
      console.log("Error: ", err); // Log any errors
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register</h2>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        {successMessage && (
          <div className="text-green-500 text-sm mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleRegister}>
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
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
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
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
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
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your last name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="bio"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Bio
            </label>
            <input
              type="text"
              id="bio"
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your bio"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
            >
              Register
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
        <div className="mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
