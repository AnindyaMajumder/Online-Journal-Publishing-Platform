import React, { useState } from 'react';
import TextEditor from './texteditor';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Journal Title:', title);
    console.log('Journal Content:', content);
    // Handle the submission logic (e.g., save to state or API)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl animate-bounce font-bold mt-2 mb-2">Tell your story</h1>
      <h2 className="text-xl text-left font-semibold text-gray-600 mt-4 mb-2">Journal Title</h2>
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Journal Title"
        className="w-full p-2 mb-4 border rounded"
      />
      <h2 className="text-xl text-left font-semibold text-gray-600 mt-4 mb-2">Journal Body</h2>
      <TextEditor onChange={handleEditorChange} />
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-600"
      >
        Post Journal
      </button>
      </div>
    </div>
  );
};

export default WritePost;