import React, { useState } from "react";

export default function Announcement() {
  const [announcements, setAnnouncements] = useState([
    "Welcome to our platform!",
    "Scheduled maintenance on Friday at 10 PM.",
  ]); // Example announcements
  const [newAnnouncement, setNewAnnouncement] = useState("");

  // Handle adding a new announcement
  const handleAdd = () => {
    if (newAnnouncement.trim() !== "") {
      setAnnouncements((prev) => [...prev, newAnnouncement]);
      setNewAnnouncement("");
      alert("Announcement published!");
    }
  };

  // Handle deleting an announcement
  const handleDelete = (index) => {
    setAnnouncements((prev) => prev.filter((_, i) => i !== index));
    alert("Announcement deleted!");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Announcements</h2>

        <ul className="space-y-4">
          {announcements.map((announcement, index) => (
            <li
              key={index}
              className="border-b pb-2 flex justify-between items-center text-gray-700"
            >
              <span>{announcement}</span>
              <button
                onClick={() => handleDelete(index)}
                className="text-sm text-gray-800 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <input
            type="text"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            placeholder="Write a new announcement..."
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex justify-center mt-3">
            <button
              onClick={handleAdd}
              className="px-5 py-4 bg-gray-800 text-white text-sm font-medium rounded-full hover:bg-red-700 transition duration-200"
            >
              Publish Announcement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
