//------------------------------------------------------------------
// Import all necessary sources, dependencies, libraries, other components
import React, { useState, useEffect } from 'react';

//------------------------------------------------------------------
// FUNCTIONAL COMPONENT
export const Demo4 = () => {
  const [bgColor, setBgColor] = useState(localStorage.getItem('bgColor') || '#6c757d');

  useEffect(() => {
    localStorage.setItem('bgColor', bgColor);
  }, [bgColor]);

  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  return (
    <div style={{ ...demo4Style, backgroundColor: bgColor }}>
      <h2>Remember User Preferences (Background Color)</h2>

      {/* Dropdown for color selection */}
      <label htmlFor="bgColorDropdown">Select Background Color: </label>
      <select id="bgColorDropdown" value={bgColor} onChange={handleColorChange} style={dropdownStyle}>
        <option value="#6c757d">Gray</option>
        <option value="#ffffff">White</option>
        <option value="#f28b82">Light Red</option>
        <option value="#fbbc04">Yellow</option>
        <option value="#34a853">Green</option>
        <option value="#4285f4">Blue</option>
        <option value="#d7aefb">Purple</option>
        <option value="#000000">Black</option>
        <option value="#ff69b4">Hot Pink</option> {/* New Color */}
        <option value="#ff4500">Orange Red</option> {/* New Color */}
      </select>

      {/* Show saved background color */}
      <p>Your selected background color is saved and will persist even if you refresh the page!</p>
    </div>
  );
};

//-----------------------------------------------------------------
// Define CSS styles
const demo4Style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '20px',
  minHeight: '70vh',
  justifyContent: 'center',
  padding: '20px',
  borderRadius: '10px',
};

const dropdownStyle = {
  marginLeft: '10px',
  padding: '5px',
};

//------------------------------------------------------------------
// Export this Component
export default Demo4;
