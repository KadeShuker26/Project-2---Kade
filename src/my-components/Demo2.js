//------------------------------------------------------------------
// Import all necessary sources, dependencies, libraries, other components
import React, { Component } from 'react'; // Import React Component Class
import PropTypes from 'prop-types';
import movie0 from './images/movie0.jpg';
import movie1 from './images/movie1.jpg';
import movie2 from './images/movie2.jpg';
import movie3 from './images/movie3.jpg';
import movie4 from './images/movie4.jpg';

//------------------------------------------------------------------
// CLASS COMPONENT
export class Demo2 extends Component {
  //----------------------------
  // Props & constructor
  constructor(props) {
    super(props);
    this.state = {
      images: [movie0, movie1, movie2, movie3, movie4],
      currentIndex: 0
    };
  }

  //----------------------------
  // Methods to navigate the slideshow
  goToNext = () => {
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex < prevState.images.length - 1 ? prevState.currentIndex + 1 : 0
    }));
  };

  goToPrevious = () => {
    this.setState((prevState) => ({
      currentIndex: prevState.currentIndex > 0 ? prevState.currentIndex - 1 : prevState.images.length - 1
    }));
  };

  //----------------------------
  // Render HTML: Outputs the HTML/JSX to the DOM.
  render() {
    return (
      <div style={slideShowStyle}>
        <button onClick={this.goToPrevious} style={arrowButtonStyle}>&larr;</button>
        <div style={imageContainerStyle}>
          <img style={imageStyle} src={this.state.images[this.state.currentIndex]} alt="image" />
        </div>
        <button onClick={this.goToNext} style={arrowButtonStyle}>&rarr;</button>
      </div>
    );
  }
}

//------------------------------------------------------------------
// Define Props Types: Have to import "PropTypes" above (if you have props)
Demo2.propTypes = {
  // No prop validation needed unless there are actual props passed
};

//-----------------------------------------------------------------
// Define CSS variables
const slideShowStyle = {
  minHeight: '70vh',
  
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px' // Adds spacing between buttons and image
};

const arrowButtonStyle = {
  fontSize: '24px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  padding: '10px'
};

const imageContainerStyle = {
  width: '250px',  // Fixed width
  height: '250px', // Fixed height
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden' // Ensures the image is contained within the box
};

const imageStyle = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'contain' // Ensures the image scales properly within the container
};

//------------------------------------------------------------------
// Export this Component
export default Demo2;
