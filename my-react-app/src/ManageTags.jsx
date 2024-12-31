import React, { useState } from "react";

export default function ManageTags() {
  const [tags, setTags] = useState(["Travel", "Food", "Lifestyle"]); // Example tags
  const [newTag, setNewTag] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTag, setEditTag] = useState("");

  // Add a new tag
  const handleAdd = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags((prev) => [...prev, newTag.trim()]);
      setNewTag("");
      alert("Tag added!");
    } else {
      alert("Tag cannot be empty or duplicate!");
    }
  };

  // Delete a tag
  const handleDelete = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
    alert("Tag deleted!");
  };

  // Start editing a tag
  const handleEditStart = (index) => {
    setEditIndex(index);
    setEditTag(tags[index]);
  };

  // Save the edited tag
  const handleEditSave = () => {
    if (editTag.trim() !== "" && !tags.includes(editTag.trim())) {
      setTags((prev) =>
        prev.map((tag, index) => (index === editIndex ? editTag.trim() : tag))
      );
      setEditIndex(null);
      setEditTag("");
      alert("Tag updated!");
    } else {
      alert("Tag cannot be empty or duplicate!");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-40">
      <h2 className="text-center font-bold text-gray-900 mb-5">Manage Tags</h2>

      <ul className="space-y-5 w-full max-w-md">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center justify-center space-x-4 border-b pb-3"
          >
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editTag}
                  onChange={(e) => setEditTag(e.target.value)}
                  className="w-2/3 px-6 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleEditSave}
                  className="ml-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition duration-200"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span className="flex-grow text-gray-700 text-center mr-32">
                  {tag}
                </span>
                <button
                  onClick={() => handleEditStart(index)}
                  className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-red-800 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-red-800 transition duration-200"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 w-full max-w-md">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Add a new tag..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="flex justify-center mt-2">
          <button
            onClick={handleAdd}
            className="min-h-10 w-full max-w-fit px-10 py-3 bg-gray-900 text-white text-sm font-medium rounded-3xl hover:bg-red-800 transition duration-200"
          >
            Add Tag
          </button>
        </div>
      </div>
    </div>
  );
}
