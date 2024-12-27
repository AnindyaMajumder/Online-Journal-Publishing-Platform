import React from 'react';
import TextEditor from './texteditor';
import Navbar from "./navbar";

const WritePost = () => {
  const handleEditorChange = (content) => {
    console.log('Editor Content:', content); // Handle editor content (e.g., save to state or API)
  };

  return (
    <div className="min-h-screen bg-gray-100">
        <div><Navbar/></div>
      <h1 className="text-2xl font-bold mt-2 mb-2">Tell your story</h1>
      <TextEditor onChange={handleEditorChange} />
      <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Post Journal
      </button>
    </div>
  );
};

export default WritePost;
