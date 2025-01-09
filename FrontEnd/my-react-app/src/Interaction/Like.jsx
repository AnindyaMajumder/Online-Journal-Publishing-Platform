import React from "react";

export default function Like({ isLiked, likeCount, handleLike }) {
  return (
    <button
      onClick={handleLike}
      className={`w-full sm:w-auto px-4 py-2 text-lg font-semibold rounded-full transition duration-200 ease-in-out ${
        isLiked ? "bg-red-900 text-white" : "bg-gray-800 text-white"
      } hover:bg-blue-500`}
    >
      {isLiked ? "Liked" : "Like"} ({likeCount})
    </button>
  );
}
