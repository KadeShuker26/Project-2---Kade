// Import all dependencies, other Components
import { useState } from 'react';
import Demo1 from './Demo1';  // Import Demo1
import Demo2 from './Demo2';  // Import Demo2
import Demo3 from './Demo3';  // Import Demo3
import Demo4 from './Demo4';  // Import Demo4
import Demo5 from './Demo5';  // Import Demo5 (new file upload feature)

// Function Component
function AdvancedJS() {    
    // Initialize clickedButton with 1 to open Demo1 by default
    const [clickedButton, setClickedButton] = useState(1);
    
    const toggleDemo = (index) => {
        setClickedButton(index);
    }

    // Button styles (without changing text boldness or active yellow color)
    const buttonStyle = {
        backgroundColor: '#5b9de3', // Lighter blue background
        borderColor: '#1a3d7e', // Dark blue border
        color: '#0c2b5e', // Darker blue text
        padding: '15px 30px', // Increased padding for more click area
        transition: 'background-color 0.3s, box-shadow 0.3s', // Smooth transitions
    };

    // Card styles with very light grey background for the demo sections
    const cardStyle = {
        backgroundColor: '#f8f9fa', // Very light grey background
        padding: '20px',
        borderRadius: '5px',
    };

    // Component UI: HTML Rendering
    return (
        <>
            {/* Ensure full height for the page */}
            <div style={{ minHeight: '70vh', overflowX: 'hidden' }}>
                {/* Full width container */}
                <div className="container-fluid p-0" style={{ minHeight: '70vh' }}> 
                    {/* BUTTONS AND DEMOS */}
                    <div className="row m-0">
                        {/* Column 1: Buttons to toggle between demos */}
                        <div className="col-12 col-md-2 bg-white sticky-top" style={{ padding: '20px' }}>
                            <div className="row">
                                <button 
                                    className={`col-6 col-md-12 btn mb-1 ${clickedButton === 1 ? 'btn-warning' : ''}`} 
                                    style={clickedButton === 1 ? { ...buttonStyle, backgroundColor: '#ffc107' } : buttonStyle} 
                                    onClick={() => toggleDemo(1)}
                                >
                                    <i className="bi bi-images"></i> DEMO-1
                                </button>
                                <button 
                                    className={`col-6 col-md-12 btn mb-1 ${clickedButton === 2 ? 'btn-warning' : ''}`} 
                                    style={clickedButton === 2 ? { ...buttonStyle, backgroundColor: '#ffc107' } : buttonStyle} 
                                    onClick={() => toggleDemo(2)}
                                >
                                    <i className="bi bi-slideshow"></i> DEMO-2
                                </button>     
                                <button 
                                    className={`col-6 col-md-12 btn mb-1 ${clickedButton === 3 ? 'btn-warning' : ''}`} 
                                    style={clickedButton === 3 ? { ...buttonStyle, backgroundColor: '#ffc107' } : buttonStyle} 
                                    onClick={() => toggleDemo(3)}
                                >
                                    <i className="bi bi-upload"></i> DEMO-3
                                </button>
                                <button 
                                    className={`col-6 col-md-12 btn mb-1 ${clickedButton === 4 ? 'btn-warning' : ''}`} 
                                    style={clickedButton === 4 ? { ...buttonStyle, backgroundColor: '#ffc107' } : buttonStyle} 
                                    onClick={() => toggleDemo(4)}
                                >
                                    <i className="bi bi-palette"></i> DEMO-4
                                </button>                  
                                <button 
                                    className={`col-6 col-md-12 btn mb-1 ${clickedButton === 5 ? 'btn-warning' : ''}`} 
                                    style={clickedButton === 5 ? { ...buttonStyle, backgroundColor: '#ffc107' } : buttonStyle} 
                                    onClick={() => toggleDemo(5)}
                                >
                                    <i className="bi bi-chat-dots"></i> DEMO-5
                                </button>
                            </div>
                        </div>

                        {/* Column 2: Demo components */}
                        <div className="col-12 col-md-10 demo-section" style={{ padding: '20px' }}>
                            <div className="row" style={{ minHeight: '75vh', overflowX: 'hidden' }}>                        
                                <div className={`col-12 fade-in`} style={{ display: clickedButton === 1 ? 'block' : 'none' }}>
                                    <div className="card mb-3" style={cardStyle}>
                                        <div className="card-body">
                                            <Demo1 />  {/* Demo 1 Component */}
                                        </div>
                                    </div>
                                </div>                   
                                <div className={`col-12 fade-in`} style={{ display: clickedButton === 2 ? 'block' : 'none' }}>
                                    <div className="card mb-3" style={cardStyle}>
                                        <div className="card-body">
                                            <Demo2 />  {/* Demo 2 Component */}
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-12 fade-in`} style={{ display: clickedButton === 3 ? 'block' : 'none' }}>
                                    <div className="card mb-3" style={cardStyle}>
                                        <div className="card-body">
                                            <Demo3 />  {/* Demo 3 Component */}
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-12 fade-in`} style={{ display: clickedButton === 4 ? 'block' : 'none' }}>
                                    <div className="card mb-3" style={cardStyle}>
                                        <div className="card-body">
                                            <Demo4 />  {/* Demo 4 Component */}
                                        </div>
                                    </div>
                                </div>
                                <div className={`col-12 fade-in`} style={{ display: clickedButton === 5 ? 'block' : 'none' }}>
                                    <div className="card mb-3" style={cardStyle}>
                                        <div className="card-body">
                                            <Demo5 />  {/* Demo 5: File upload */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                </div>            
            </div>        
        </>
    );
}

// Export this component to the entire app, can be re-used or hooked into other Components
export default AdvancedJS;
