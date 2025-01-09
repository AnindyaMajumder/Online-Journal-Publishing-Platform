import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ journalContent, setJournalContent, isEditing }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && isEditing && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ color: [] }, { background: [] }],
            ["blockquote", "code-block"],
            [{ script: "sub" }, { script: "super" }],
            [{ direction: "rtl" }],
            ["emoji"],
          ],
        },
      });

      quillRef.current.root.innerHTML = journalContent;

      quillRef.current.on("text-change", () => {
        setJournalContent(quillRef.current.root.innerHTML);
      });
    }

    return () => {
      if (quillRef.current && !isEditing) {
        quillRef.current = null; // Destroy Quill instance
      }
    };
  }, [isEditing, journalContent, setJournalContent]);

  return isEditing ? <div ref={editorRef} className="editor" /> : null;
};

export default QuillEditor;
