import React from "react";

export default function Summarizer({ handleSummarize, summary }) {
  return (
    <button
      onClick={handleSummarize}
      className="w-full sm:w-auto px-4 py-2 text-lg font-semibold rounded-full bg-gray-800 text-white hover:bg-red-900 transition duration-200 ease-in-out"
    >
      Summarize
      {summary && (
        <div className="mt-4 p-4 bg-gray-800 border rounded-md">
          <h4 className="font-bold">Summary:</h4>
          <p>{summary}</p>
        </div>
      )}
    </button>
  );
}
