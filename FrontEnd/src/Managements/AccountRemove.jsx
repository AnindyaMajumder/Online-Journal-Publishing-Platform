import React, { useState, useEffect } from "react"; 
import axios from "axios";

export default function AccountRemove() {
  const [users, setUsers] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false); // Loading state
  const [error, setError] = useState(null); // To handle errors
  const [successMessage, setSuccessMessage] = useState(null); // For success pop-up

  // Fetch users from the server when the component is mounted
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminAuthToken");
        if (!token) {
          setError("Admin token missing. Please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:8000/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUsers(response.data); // Assuming response contains user data
        } else {
          setError(`Failed to load users: ${response.data.message || "Unknown error."}`);
        }
      } catch (err) {
        setError("An error occurred while loading users.");
        console.error("Error:", err);
      }
    };

    fetchUsers();
  }, []);

  // Handle deleting a user account
  const handleDelete = async (username) => {
    try {
      const token = localStorage.getItem("adminAuthToken");
      if (!token) {
        setError("Admin token missing. Please log in again.");
        return;
      }

      setIsRemoving(true);

      const response = await axios.post(
        "http://localhost:8000/admin/remove-user",
        username, // Passing username in the body
        {
          headers: {
            "Content-Type": "application/string",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
        setSuccessMessage(`User ${username} has been deleted.`); // Show success message
      } else {
        setError(`Failed to delete user: ${response.data.message || "Unknown error."}`);
      }
    } catch (err) {
      setError("An error occurred while deleting the account.");
      console.error("Error:", err);
    } finally {
      setIsRemoving(false); // Reset loading state
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          Account Removal
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}

        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border-b pb-5">
              <p className="text-gray-600">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => handleDelete(user.username)}
                  className={`max-w-md px-4 py-2 bg-gray-800 text-white text-base font-medium rounded-full hover:bg-red-700 transition duration-200 ${
                    isRemoving ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label={`Delete account for ${user.username}`}
                  disabled={isRemoving}
                >
                  {isRemoving ? "Removing..." : "Delete Account"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
