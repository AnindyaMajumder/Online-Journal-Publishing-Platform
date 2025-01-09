import React, { useState, useEffect } from "react";
import axios from "axios";
import Report from "./Report.jsx";
import Repost from "./Repost.jsx";
import Like from "./Like.jsx";
import Comment from "./Comment.jsx";
import Summarizer from "./Summarizer.jsx";
import EditJournal from "./EditJournal.jsx";
import pic1 from "../image/pic1.jpg";
import parse from "html-react-parser";

export default function Interaction() {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isReported, setIsReported] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [summary, setSummary] = useState("");
  const [journalTitle, setJournalTitle] = useState("");
  const [journalContent, setJournalContent] = useState("");
  const postId = localStorage.getItem("postId");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchJournal = async () => {
      if (!postId) {
        console.error("No postId found in localStorage");
        return;
      }
      try {
        const response = await axios.post("http://localhost:8000/article", postId, {
          headers: {
            "Content-Type": "application/string",
          },
        });
        setJournalTitle(response.data.title);
        setJournalContent(response.data.body);
        setLikeCount(response.data.likeCount || 0);
        setIsLiked(response.data.isLiked || false);
        setComments(response.data.comments || []);
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };
    fetchJournal();
  }, [postId]);

  const handleLike = async () => {
    if (!postId || !token) {
      console.error("Missing postId or token");
      return;
    }
    try {
      const endpoint = isLiked
        ? "http://localhost:8000/journal/unlike"
        : "http://localhost:8000/journal/like";
      const response = await axios.post(endpoint, postId, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/string",
        },
      });
      if (response.status === 200) {
        setIsLiked(!isLiked);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
      }
    } catch (error) {
      console.error("Error handling like/unlike:", error);
    }
  };

  const handleAddComment = async (commentText) => {
    if (!postId || !token || !commentText.trim()) {
      console.error("Missing postId, token, or comment text");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8000/comment/add-comment",
        {
          journalId: postId,
          comment: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        // Assuming the response contains the newly added comment with its details (like id, username, etc.)
        const newComment = response.data;
  
        // Update the comments state with the new comment
        setComments((prevComments) => [...prevComments, newComment]);
  
        setNewComment(""); // Clear the input field after adding the comment
        console.log("Comment added successfully");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };
  
  const handleEditComment = async (id, updatedCommentText) => {
    if (!id || !postId || !token || !updatedCommentText.trim()) {
      console.error("Missing id, postId, token, or updated comment text");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:8000/comment/edit-comment",
        {
          id: id,
          journalId: postId,
          comment: updatedCommentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === id ? { ...comment, text: updatedCommentText, username: comment.username } : comment
          )
        );
        console.log("Comment edited successfully");
      } else {
        console.error("Failed to edit comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };
  

  const handleSummarize = async () => {
    if (!postId) {
      console.error("No postId found in localStorage");
      return;
    }

    try {
      console.log("Calling summary API with postId:", postId);

      const response = await axios.post(
        "http://localhost:8000/summary",
        postId,
        {
          headers: {
            "Content-Type": "application/string",
          },
        }
      );

      if (response.status === 200) {
        console.log("Summary fetched successfully:", response.data);
        setSummary(response.data);
      } else {
        console.error("Failed to fetch summary. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching summary:", error.message);
    }
  };

  const handleRepost = async () => {
    if (!postId || !token) {
      console.error("Missing postId or token");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8000/journal/save-journal",
        postId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/string",
          },
        }
      );
  
      if (response.status === 200) {
        console.log("jounral saved successfully");
        alert("Your journal has been saved successfully.");
      } else {
        console.error("Failed to save journal. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error saving journal:", error.message);
    }
  };

  const fetchSavedJournals = async () => {
    if (!token) {
      console.error("Missing auth token");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8000/user/saved", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        console.log("Saved journals:", response.data);
        // Handle saved journals data (e.g., set state)
      } else {
        console.error("Failed to fetch saved journals. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error fetching saved journals:", error.message);
    }
  };

  const handleDeleteComment = async (index) => {
    const commentToDelete = comments[index];
  
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
          data: commentToDelete.id, // Pass comment ID as the body
        }
      );
  
      if (response.status === 200) {
        console.log("Comment deleted successfully");
  
        // Refresh the comments list
        setComments((prevComments) =>
          prevComments.filter((_, i) => i !== index)
        );
      } else {
        console.error("Failed to delete comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  
  
  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${pic1})` }}
    >
      <div className="max-w-4xl mx-auto p-7 relative bg-white bg-opacity-40 rounded-lg">
        <div className="relative">
          <div className="bg-white p-10 rounded-lg shadow-lg mb-6 relative border border-gray-800 pb-16">
            <div className="text-lg text-gray-800 mb-4">
              <h2 className="text-2xl font-bold mb-2">{journalTitle}</h2>
              <p className="text-justify">{parse(journalContent)}</p>
            </div>
          </div>
          <div className="absolute bottom-4 left-4 flex space-x-1">
            <Like isLiked={isLiked} likeCount={likeCount} handleLike={handleLike} />
            <Repost handleRepost={handleRepost} />
            <Summarizer handleSummarize={handleSummarize} summary={summary} />
            <Report handleReport={() => setIsReported(true)} className="px-1 py-0.5 text-xs" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-40">
          <Comment
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={handleAddComment}
            handleSaveComment={(index, updatedComment) => {
              const commentToEdit = comments[index];
              handleEditComment(commentToEdit.id, updatedComment.text);
              setComments((prevComments) => {
                const updatedComments = [...prevComments];
                updatedComments[index] = { ...commentToEdit, text: updatedComment.text };
                return updatedComments;
              });
            }}
            handleDeleteComment={handleDeleteComment}
            //handleDeleteComment={(index) => {
              //setComments((prevComments) => prevComments.filter((_, i) => i !== index));
            //}}
          />
        </div>
      </div>
    </div>
  );
}
