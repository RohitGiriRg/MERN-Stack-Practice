// src/App.js
import React from "react";
import FileUpload from "./components/FileUpload";
import FilesDisplay from "./components/FileDisplay";

const App = () => {
  return (
    <div>
      <FileUpload />
      <FilesDisplay />
    </div>
  );
};

export default App;
