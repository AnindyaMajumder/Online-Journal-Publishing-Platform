import React, { useState } from 'react';
import TextEditor from './texteditor';
import { useNavigate } from 'react-router-dom';


const WritePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    console.log('Journal Title:', title);
    console.log('Journal Content:', content);
    // Handle the submission logic (e.g., save to state or API)
    try {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbmUyMyIsImlhdCI6MTczNjI4MDc4MSwiZXhwIjoxNzM2MzY3MTgxfQ.DRfjllaZotwzwTCTgOqDf7XMPVIeG0A0wPlF68o4EHs'; // Replace with your actual token
      const response = await fetch('http://localhost:8000/journal/add-journal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          body: content
        }),
      });
      if (response.ok) {
        console.log('Journal added successfully');
      } else {
        console.error('Failed to add journal');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsModalOpen(true);
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    navigate('/');
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Journal added successfully!</p>
            <button
              onClick={handleContinue}
              className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-600"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritePost;