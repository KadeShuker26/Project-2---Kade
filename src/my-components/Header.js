// Import all dependencies, other Components
import { Link } from 'react-router-dom';

// Function Component
function Header() {
  const headerStyle = {
    minHeight: '15vh',
    backgroundColor: '#2C3E50',
    width: '100%', // Ensure the header spans the full width
  };
  const taglineStyle = {
    minHeight: '15vh',
    backgroundColor: '#2C3E50',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  // Component UI: HTML Rendering
  return (
    <>
      <header className="container-fluid" style={headerStyle}>
        <div className="row">
          <div className="col-12 col-lg-8 text-center text-white display-5" style={taglineStyle}>
            Phone Fix Booking System
          </div>
          <div className="col-12 col-lg-4">
            <div className="row">
              {/* Button 1 */}
              <Link
                to="/"
                className="col-6 p-0 m-0 bg-info border border-dark text-center text-white"
                style={{ textDecoration: 'none' }}
              >
                HOME
              </Link>
              {/* Button 2 */}
              <Link
                to="/advancedJS"
                className="col-6 p-0 m-0 bg-info border border-dark text-center text-white"
                style={{ textDecoration: 'none' }}
              >
                EXTENSION
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

// Export this component to the entire app, can be re-used or hooked into other Components
export default Header;
