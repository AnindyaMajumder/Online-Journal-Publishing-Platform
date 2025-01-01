import React from "react";

export default function Comment({
  comments,
  newComment,
  setNewComment,
  handleAddComment,
}) {
  const handleSubmit = () => {
    if (newComment.trim() === "") return; // Prevent empty comments
    handleAddComment(); // Add the comment
    setNewComment(""); // Clear the input box
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments:</h3>
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div
              key={index}
              className="p-4 bg-gray-40 rounded-lg border border-gray-40"
            >
              <p>{comment}</p>
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
