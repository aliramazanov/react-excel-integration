import { useState } from "react";
import Button from "./components/Button/Button.jsx";
import Table from "./components/Table/Table.jsx";

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [lastModifiedDate, setLastModifiedDate] = useState("");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setLastModifiedDate(formatLastModifiedDate(file.lastModifiedDate));
  };

  const formatLastModifiedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <Button onFileSelect={handleFileSelect} />
      {selectedFile && (
        <div className="file-information">
          <p>Selected File: {selectedFile.name}</p>
          <p>Last Modified: {lastModifiedDate}</p>
        </div>
      )}
      <Table selectedFile={selectedFile}></Table>
    </div>
  );
}
