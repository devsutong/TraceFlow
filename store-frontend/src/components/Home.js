import React from 'react';
import { useLocation } from 'react-router-dom';
import './styles/home.css';
const Home = () => {
  const location = useLocation();
  const message = location.state?.message || '';

  return (
    <div className="home-container">
      {message && <p className="message-alert">{message}</p>}
      {/* Other content of the Home component */}
    </div>
  );
};

export default Home;
