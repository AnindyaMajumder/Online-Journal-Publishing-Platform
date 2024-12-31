import React, { useState } from "react";

export default function JournalRemove() {
  // Sample journal posts with some marked as violent
  const [journals, setJournals] = useState([
    { id: 1, title: "Healthy Lifestyle Tips", content: "Some content here.", isViolent: false },
    { id: 2, title: "Violence in the City", content: "Inappropriate content.", isViolent: true },
    { id: 3, title: "Positive Thinking", content: "Some uplifting content.", isViolent: false },
  ]);

  // Function to remove a journal
  const handleRemoveJournal = (id) => {
    setJournals((prevJournals) => prevJournals.filter((journal) => journal.id !== id));
    alert("Journal removed successfully.");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-40">
      <div className="w-full max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Journal Removal</h2>
        
        {/* List of journals with violent posts */}
        <div className="space-y-4">
          {journals
            .filter((journal) => journal.isViolent) // Only show violent journals
            .map((journal) => (
              <div
                key={journal.id}
                className="border border-gray-300 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{journal.title}</h3>
                  <p className="text-sm text-gray-700">{journal.content}</p>
                </div>
                <button
                  onClick={() => handleRemoveJournal(journal.id)}
                  className="px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-full hover:bg-red-700 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
        </div>

        {/* No violent posts message */}
        {journals.filter((journal) => journal.isViolent).length === 0 && (
          <p className="mt-4 text-sm text-gray-900">
            No violent posts detected.
          </p>
        )}
      </div>
    </div>
  );
}
