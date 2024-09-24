import { Link } from 'react-router-dom';

function FormButtons({ handleReset }) {
  return (
    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-3">
      <input
        type="submit"
        className="btn text-dark bg-white m-2"
        style={{ width: '150px' }}  // Set a consistent width
        value="SUBMIT"
      />
      <input
        type="button"
        className="btn text-dark bg-white m-2"
        style={{ width: '150px' }}  // Set a consistent width
        value="RESET"
        onClick={handleReset} // Call the reset handler when clicked
      />
      <Link to="/faq" className="m-2">
        <input
          type="button"
          className="btn text-dark bg-white"
          style={{ width: '150px' }}  // Set a consistent width
          value="FAQ"
        />
      </Link>
    </div>
  );
}

export default FormButtons;
