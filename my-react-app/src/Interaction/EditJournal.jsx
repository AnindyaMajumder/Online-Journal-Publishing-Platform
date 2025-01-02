import React from "react";

export default function EditJournal({ handleEditJournal, isEditing }) {
  return (
    <button
      onClick={handleEditJournal}
      className="w-full sm:w-auto px-4 py-2 text-lg font-semibold rounded-full bg-gray-800 text-white hover:bg-red-900 transition duration-200 ease-in-out"
    >
      {isEditing ? "Save" : "Edit"}
    </button>
  );
}
