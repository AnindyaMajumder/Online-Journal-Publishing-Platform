import React, { useState } from "react";

export default function Comment({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
  handleSaveComment,
  handleDeleteComment
}) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [menuIndex, setMenuIndex] = useState(null);

  const handleSubmit = () => {
    if (newComment.trim() === "") return;

    const updatedComment = {
      username: "User1", // Placeholder username
      text: newComment
    };

    // Add the new comment by updating the parent state
    handleAddComment([...comments, updatedComment]);
    setNewComment(""); // Clear the input field after adding
  };

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditedComment(comments[index].text);
  };

  const handleSaveEditAction = (index) => {
    if (editedComment.trim() === "") return;

    const updatedComment = {
      username: comments[index].username, // Keep the same username
      text: editedComment // Updated comment text
    };

    // Pass the updated comment to the parent component to save it
    handleSaveComment(index, updatedComment);
    setEditingIndex(null); // Exit editing mode
    setEditedComment(""); // Clear the edit input
  };

  const handleDeleteCommentAction = (index) => {
    // Remove the comment by updating the parent state
    handleDeleteComment(index);
  };

  const handleMenuToggle = (index) => {
    // If a menu is open, close it, otherwise open the current menu
    setMenuIndex((prevIndex) => {
      if (prevIndex === index) {
        return null; // Close the menu if the same one is clicked
      } else {
        return index; // Open the new menu
      }
    });

    // Automatically hide the menu after 2 seconds
    setTimeout(() => {
      setMenuIndex(null);
    }, 2000);
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments:</h3>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="p-4 bg-gray-40 rounded-lg border border-gray-40 relative flex items-start space-x-4"
            >
              <div className="text-right font-bold text-red-900">{comment.username}:</div> {/* Display Username */}

              <div className="flex-1">
                <p>{comment.text}</p>

                <button
                  onClick={() => handleMenuToggle(index)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
                >
                  &#x22EE;
                </button>

                {menuIndex === index && (
                  <div
                    className="absolute top-8 right-2 bg-white border border-gray-300 rounded-lg shadow-md z-50"
                  >
                    <button
                      onClick={() => handleEditComment(index)}
                      className="block px-4 py-2 text-gray-800 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCommentAction(index)}
                      className="block px-4 py-2 text-gray-800 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                )}

                {editingIndex === index && (
                  <div className="mt-4">
                    <input
                      type="text"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      className="p-3 w-full border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={() => handleSaveEditAction(index)}
                      className="mt-2 px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-red-900 transition duration-200 ease-in-out"
                    >
                      Save Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="p-3 w-full border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-full hover:bg-red-900 transition duration-200 ease-in-out"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}
