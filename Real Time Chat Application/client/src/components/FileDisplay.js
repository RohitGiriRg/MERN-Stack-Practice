// src/components/FilesDisplay.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const FilesDisplay = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get("http://localhost:5000/files");
        setFiles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFiles();
  }, []);

  const handleDelete = async (fileId) => {
    try {
      await axios.delete(`http://localhost:5000/files/${fileId}`);
      setFiles(files.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a href={file.url} target="_blank" rel="noopener noreferrer">
              {file.filename}
            </a>
            <button onClick={() => handleDelete(file._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilesDisplay;
