import React, { useState } from "react";
import Report from "./Interaction/Report";
import Repost from "./Interaction/Repost";
import Like from "./Interaction/Like";
import Comment from "./Interaction/Comment";
import Summarizer from "./Interaction/Summarizer";
import EditJournal from "./Interaction/EditJournal"; // Import EditJournal component
import pic1 from './image/pic1.jpg'; // Import your image

export default function Interaction() {
  const [isLiked, setIsLiked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [summary, setSummary] = useState("");
  const [isEditing, setIsEditing] = useState(false); // State to control editing mode
  const [journalTitle, setJournalTitle] = useState("Journal Title");
  const [journalContent, setJournalContent] = useState("<p>This is the journal content. Add more details as needed.</p>");

  // Toggle editing mode and save content if exiting edit mode
  const handleToggleEdit = () => {
    if (isEditing) {
      // Save logic can be added here if needed
      console.log("Journal content saved:", journalContent);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url(${pic1})` }}>
      <div className="max-w-4xl mx-auto p-7 relative bg-white bg-opacity-40 rounded-lg"> {/* Increased width */}
        <div className="relative">
          {/* Position the EditJournal button in the top-right corner */}
          <div className="absolute top-4 right-4 z-10">
            <EditJournal handleEditJournal={handleToggleEdit} isEditing={isEditing} />
          </div>

          {/* Journal Content Section */}
          <div className="bg-white p-10 rounded-lg shadow-lg mb-6 relative border border-gray-800 pb-16"> {/* Increased padding */}
            <div className="text-lg text-gray-800 mb-4">
              <h2 className="text-2xl font-bold mb-2">{journalTitle}</h2>
              {/* Conditionally render the journal content or a textarea if editing */}
              {isEditing ? (
                <textarea
                  value={journalContent}
                  onChange={(e) => setJournalContent(e.target.value)}
                  className="w-full p-6 h-64 border border-gray-300 rounded-md" // Increased padding, width, and height
                />
              ) : (
                <div
                  className="journal-content"
                  dangerouslySetInnerHTML={{ __html: journalContent }}
                />
              )}
            </div>
          </div>

          {/* Interaction Buttons outside the journal content, positioned at bottom-left corner */}
          <div className="absolute bottom-4 left-4 flex space-x-1"> {/* Reduced space between buttons */}
            <Like
              isLiked={isLiked}
              handleLike={() => setIsLiked(!isLiked)}
              className="px-1 py-0.5 text-xs" // Smaller button size
            />
            <Repost
              handleRepost={() => alert("Journal has been reposted.")}
              className="px-1 py-0.5 text-xs" // Smaller button size
            />
            <Summarizer
              handleSummarize={() => alert("Summary generated.")}
              summary={summary}
              className="px-1 py-0.5 text-xs" // Smaller button size
            />
            <Report
              handleReport={() => setIsReported(true)}
              className="px-1 py-0.5 text-xs" // Smaller button size
            />
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-40"> {/* Increased padding */}
          <Comment
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            handleAddComment={setComments}
            handleSaveComment={(index, updatedComment) =>
              setComments((prevComments) => {
                const updatedComments = [...prevComments];
                updatedComments[index] = updatedComment;
                return updatedComments;
              })
            }
            handleDeleteComment={(index) =>
              setComments((prevComments) => prevComments.filter((_, i) => i !== index))
            }
          />
        </div>
      </div>
    </div>
  );
}
