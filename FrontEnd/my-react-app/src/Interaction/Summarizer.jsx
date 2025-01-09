import React, { useState } from "react";

export default function Summarizer({ handleSummarize, summary }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  console.log("Props received in Summarizer:", { handleSummarize, summary }); // Debugging log

  const handleSummarizeAndShow = async () => {
    console.log("Summarize button clicked"); // Debugging log
    await handleSummarize(); // Call the function
    setIsPopupVisible(true); // Show popup
    console.log("Popup visibility:", isPopupVisible); // Debugging log
  };

  return (
    <div className="relative">
      <button
        onClick={handleSummarizeAndShow}
        className="w-full sm:w-auto px-4 py-2 text-lg font-semibold rounded-full bg-gray-800 text-white hover:bg-red-900 transition duration-200 ease-in-out"
      >
        Summarize
      </button>

      {isPopupVisible && summary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 max-w-md p-6 bg-white rounded-lg shadow-lg text-gray-800">
            <h4 className="font-bold text-lg mb-4">Summary</h4>
            <p className="text-sm mb-4">{summary}</p>
            <button
              onClick={() => setIsPopupVisible(false)}
              className="w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-full hover:bg-red-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
