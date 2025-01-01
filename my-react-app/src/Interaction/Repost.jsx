import React from "react";

export default function Repost({ handleRepost }) {
  return (
    <button
      onClick={handleRepost}
      className="w-full sm:w-auto px-4 py-2 text-lg font-semibold rounded-full bg-gray-800 text-white hover:bg-red-900 transition duration-200 ease-in-out"
    >
      Repost
    </button>
  );
}
