import React from "react";

export default function Report({ handleReport }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={handleReport}
        className="px-8 py-3 bg-black text-white text-base font-medium rounded-full hover:bg-gray-800 transition duration-200"
      >
        Report
      </button>
    </div>
  );
}
