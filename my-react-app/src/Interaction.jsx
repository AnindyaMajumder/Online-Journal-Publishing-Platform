import React, { useState } from "react"; 
import QuillEditor from "./QuillEditor"; // Import the Quill editor component
import Report from "./Interaction/Report";
import Repost from "./Interaction/Repost";
import Like from "./Interaction/Like";
import Comment from "./Interaction/Comment";
import Summarizer from "./Interaction/Summarizer";

export default function Interaction() {
  const [isLiked, setIsLiked] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [summary, setSummary] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [journalTitle, setJournalTitle] = useState("Journal Title");
  const [journalContent, setJournalContent] = useState(
    "<p>This is the journal content. Add more details as needed.</p>" // Store as HTML
  );

  const handleReport = () => {
    setIsReported(true);
    alert("Journal has been reported as inappropriate.");
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  const handleSummarize = async () => {
    const generatedSummary = await generateSummary(journalContent);
    setSummary(generatedSummary);
  };

  const generateSummary = (content) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("This is a generated summary for the journal content.");
      }, 2000);
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveJournal = () => {
    // When saving, switch to non-edit mode and save the content
    setIsEditing(false);
    // You can also save the journal to a server or database here if needed
    // For now, we're just storing it in state
    console.log("Journal saved:", journalContent);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <div className="bg-white p-8 rounded-lg shadow-lg mb-6 relative border border-gray-800">
        <button
          onClick={toggleEdit}
          className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white font-semibold transition duration-200 ${
            isEditing ? "bg-red-700 hover:bg-red-900" : "bg-gray-800 hover:bg-gray-900"
          }`}
        >
          {isEditing ? "Save Changes" : "Edit Journal"}
        </button>

        <div className="text-lg text-gray-800 mb-4">
          {isEditing ? (
            <>
              {/* Journal Title with spacing */}
              <input
                type="text"
                value={journalTitle}
                onChange={(e) => setJournalTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg mb-4 mt-12 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Writing Area */}
              <QuillEditor
                journalContent={journalContent}
                setJournalContent={setJournalContent}
                isEditing={isEditing} // Pass isEditing to QuillEditor to control visibility
              />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-2">{journalTitle}</h2>
              <div
                className="journal-content"
                dangerouslySetInnerHTML={{ __html: journalContent }}
              />
            </>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 mb-6">
          <Like isLiked={isLiked} handleLike={handleLike} />
          <Repost handleRepost={() => alert("Journal has been reposted.")} />
          <Summarizer handleSummarize={handleSummarize} summary={summary} />
          <Report handleReport={handleReport} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border border-gray-40">
        <Comment
          comments={comments}
          newComment={newComment}
          setNewComment={setNewComment}
          handleAddComment={handleAddComment}
        />
      </div>
    </div>
  );
}
