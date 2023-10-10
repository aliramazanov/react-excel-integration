import { useRef } from "react";
import PropTypes from "prop-types";

function Button({ onFileSelect }) {
  const fileInputRef = useRef(null);

  const handleLoadExcelFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="button-container">
      <button onClick={handleLoadExcelFileClick}>Load Excel File</button>
      <input
        type="file"
        accept=".xlsx"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

Button.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
};

export default Button;
