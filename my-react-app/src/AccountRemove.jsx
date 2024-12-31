import React, { useState } from "react";

export default function AccountRemove() {
  // Sample user accounts for demonstration
  const [users, setUsers] = useState([
    { id: 1, username: "JohnDoe", email: "john@example.com" },
    { id: 2, username: "JaneSmith", email: "jane@example.com" },
    { id: 3, username: "AliceBrown", email: "alice@example.com" },
  ]);

  // Handle deleting a user account
  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    alert(`User with ID ${id} has been deleted.`);
  };

  return (
    <div className="h-screen bg-gray-000 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
          Account Removal
        </h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border-b pb-5">
              <p className="text-justify text-gray-600">
                <strong>Username:</strong> {user.username}
              </p>
              <p className="text-justify text-gray-600">
                <strong>Email:</strong> {user.email}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="max-w-md px-4 py-4 bg-gray-800 text-white text-base font-medium rounded-full hover:bg-red-700 transition duration-200 ml-20"
                  aria-label={`Delete account for ${user.username}`}
                >
                  Delete Account
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
