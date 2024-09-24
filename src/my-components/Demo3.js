//------------------------------------------------------------------
// Import all necessary sources, dependencies, libraries, other components
import React, { useState } from 'react'; // Import React hooks

//------------------------------------------------------------------
// FUNCTIONAL COMPONENT
export const Demo3 = () => {
  //----------------------------
  // useState Hook for file upload and image preview
  const [uploadedImage, setUploadedImage] = useState(null);

  //----------------------------
  // Handle file input change (when user uploads a file)
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader(); // Create a FileReader to read the file
      reader.onloadend = () => {
        setUploadedImage(reader.result); // Set the uploaded image as a preview
      };
      reader.readAsDataURL(file); // Read the file as Data URL
    }
  };

  //----------------------------
  // Render HTML: Outputs the HTML/JSX to the DOM.
  return (
    <div style={demo3Style}>
      <h2>Upload the Repair Phone Image</h2>

      {/* File input for image upload */}
      <input type="file" accept="image/*" onChange={handleImageUpload} style={fileInputStyle} />

      {/* Display the uploaded image */}
      {uploadedImage && (
        <div style={imageContainerStyle}>
          <img src={uploadedImage} alt="Uploaded" style={imageStyle} />
        </div>
      )}
    </div>
  );
};

//-----------------------------------------------------------------
// Define CSS styles
const demo3Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  minHeight: '70vh',
  justifyContent: 'center',
};

const fileInputStyle = {
  fontSize: '16px',
  padding: '10px',
  cursor: 'pointer',
};

const imageContainerStyle = {
  marginTop: '20px',
  width: '300px',
  height: '300px',
  border: '2px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain',
};

//------------------------------------------------------------------
// Export this Component
export default Demo3;
