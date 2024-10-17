import React from 'react';
import './styles/spinner.css'; // Import custom styles for spinner

// Assuming you placed the GIF in the 'public' folder or 'src/assets'
const spinnerUrl = '/loading.gif'; // Update path if needed

const Spinner = () => {
  return (
    <div className="spinner-container">
      <img src={spinnerUrl} alt="Loading..." className="spinner" />
    </div>
  );
};

export default Spinner;
