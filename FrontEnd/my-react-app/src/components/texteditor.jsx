import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
  ],
};

const TextEditor = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (content) => {
    setValue(content);
    if (onChange) onChange(content); // Pass content to parent if a handler is provided
  };

  return (
    <div className="bg-white p-4 border rounded shadow-md">
        <ReactQuill
        theme="snow"
        value={value}
        onChange={handleChange}
        modules={modules}
        className="min-h-[200px]"
        />

    </div>
  );
};

export default TextEditor;
