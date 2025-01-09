import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const postId = localStorage.getItem("postId");
  const token = localStorage.getItem("authToken");

  const [commentDetails, setCommentDetails] = useState([]);

  useEffect(() => {
    const fetchCommentsWithAuthors = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/article",
          postId,
          {
            headers: {
              "Content-Type": "application/string"
            }
          }
        );
        const commentData = response.data.comments || [];
        setCommentDetails(commentData);
      } catch (error) {
        console.error("Error fetching comments with authors:", error);
      }
    };

    if (postId) {
      fetchCommentsWithAuthors();
    }
  }, [postId]);

  const handleSubmit = () => handleAddComment(newComment);

  const handleEditComment = (index) => {
    setEditingIndex(index);
    setEditedComment(commentDetails[index].comment);
  };

  const handleSaveEditAction = (index) => {
    if (editedComment.trim() === "") return;
    
    // Save the edited comment
    handleSaveComment(index, {
      username: commentDetails[index].author,
      text: editedComment
    });
    
    // Update the commentDetails state with the updated comment
    setCommentDetails((prevComments) =>
      prevComments.map((comment, i) =>
        i === index ? { ...comment, comment: editedComment } : comment
      )
    );
    
    // Reset editing state
    setEditingIndex(null);
    setEditedComment("");
  };

  const handleDeleteCommentAction = async (index) => {
    const commentToDelete = commentDetails[index];
  
    if (!commentToDelete || !token) {
      console.error("Missing comment or authentication token");
      return;
    }
  
    try {
      const response = await axios.delete(
        "http://localhost:8000/comment/delete-comment",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/string",
          },
          data: commentToDelete.id, // Pass user ID as the body
        }
      );
  
      if (response.status === 200) {
        console.log("Comment deleted successfully");
  
        // Refresh the comments list
        setCommentDetails((prevComments) =>
          prevComments.filter((_, i) => i !== index)
        );
      } else {
        console.error("Failed to delete comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  

  const handleMenuToggle = (index) => {
    setMenuIndex((prevIndex) => (prevIndex === index ? null : index));
    setTimeout(() => setMenuIndex(null), 2000);
  };

  

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-4">Comments:</h3>
      <div className="space-y-4">
        {commentDetails.length > 0 ? (
          commentDetails.map((comment, index) => (
            <div
              key={comment.id}
              className="p-4 bg-gray-40 rounded-lg border border-gray-40 relative flex items-start space-x-4"
            >
              <div className="text-right font-bold text-red-900">{comment.author}:</div>
              <div className="flex-1">
                <p>{comment.comment}</p>
                <button
                  onClick={() => handleMenuToggle(index)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold"
                >
                  &#x22EE;
                </button>
                {menuIndex === index && (
                  <div className="absolute top-8 right-2 bg-white border border-gray-300 rounded-lg shadow-md z-50">
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
