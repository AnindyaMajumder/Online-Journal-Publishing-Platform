import React, { useState, useEffect } from "react";
import axios from "axios";
import Report from "./Interaction/Report";
import Repost from "./Interaction/Repost";
import Like from "./Interaction/Like";
import Comment from "./Interaction/Comment";
import Summarizer from "./Interaction/Summarizer";
import EditJournal from "./Interaction/EditJournal";
import pic1 from "./image/pic1.jpg";

export default function Interaction() {
  const [isLiked, setIsLiked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [summary, setSummary] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [journalTitle, setJournalTitle] = useState("");
  const [journalContent, setJournalContent] = useState("");
  const postId = localStorage.getItem("postId");

  
  // Fetch journal data on component mount
  useEffect(() => {
    const fetchJournal = async () => {
      console.log("postID:", postId)
      if (!postId) {
        console.error("No postId found in localStorage");
        return;
      }
      try {
        const response = await axios.post("http://localhost:8000/article", 
          postId,
          {
            headers: {
              "Content-Type": "application/string",
            },
          });
        setJournalTitle(response.data.title);
        setJournalContent(response.data.content);
        console.log("Journal data fetched:", response.data);
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };
    fetchJournal();
  }, [postId]);

  const handleToggleEdit = () => {
    if (isEditing) {
      console.log("Journal content saved:", journalContent);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${pic1})` }}
    >
      <div className="max-w-4xl mx-auto p-7 relative bg-white bg-opacity-40 rounded-lg">
        <div className="relative">
          {/* Edit Button */}
          <div className="absolute top-4 right-4 z-10">
            <EditJournal
              handleEditJournal={handleToggleEdit}
              isEditing={isEditing}
            />
          </div>

          {/* Journal Content Section */}
          <div className="bg-white p-10 rounded-lg shadow-lg mb-6 relative border border-gray-800 pb-16">
            <div className="text-lg text-gray-800 mb-4">
              <h2 className="text-2xl font-bold mb-2">{journalTitle}</h2>
              {isEditing ? (
                <textarea
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  className="w-full p-6 h-64 border border-gray-300 rounded-md"
                />
              ) : (
                <div
                  className="journal-content"
                  dangerouslySetInnerHTML={{ __html: journalContent }}
                />
              )}
            </div>
          </div>

          {/* Interaction Buttons */}
          <div className="absolute bottom-4 left-4 flex space-x-1">
            <Like
              isLiked={isLiked}
              handleLike={() => setIsLiked(!isLiked)}
              className="px-1 py-0.5 text-xs"
            />
            <Repost
              handleRepost={() => alert("Journal has been reposted.")}
              className="px-1 py-0.5 text-xs"
            />
            <Summarizer
              handleSummarize={() => alert("Summary generated.")}
              summary={summary}
              className="px-1 py-0.5 text-xs"
            />
            <Report
              handleReport={() => setIsReported(true)}
              className="px-1 py-0.5 text-xs"
            />
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-40">
          <Comment
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={(comment) =>
              setComments((prevComments) => [...prevComments, comment])
            }
            handleSaveComment={(index, updatedComment) =>
              setComments((prevComments) => {
                const updatedComments = [...prevComments];
                updatedComments[index] = updatedComment;
                return updatedComments;
              })
            }
            handleDeleteComment={(index) =>
              setComments((prevComments) =>
                prevComments.filter((_, i) => i !== index)
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
