import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDrawer from '../../Drawers/components/Profile/components/ProfileDrawer';
import logo from '../../Assets/logo.png';
import cartIcon from '../../Assets/cart_icon.png';
import { FaPlus } from 'react-icons/fa';
import Spinner from '../../Spinner'; // Import Spinner component
import '../styles/navbar.css';

export default function Navbar({ isAuthenticated, userInfo, onLogout }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading spinner
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowDrawer(!showDrawer);
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

  const handleAddProductClick = () => {
    setLoading(true); // Show spinner on click
    setTimeout(() => {
      setLoading(false); // Hide spinner after the timeout
      navigate('/seller-dashboard'); // Navigate to seller-dashboard
    }, 1500); // Adjust the timeout duration as needed
  };

  if (loading) {
    return (
      <div className="spinner-overlay">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand navbar-title" href="/">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="navbar-center">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" id="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
            <div className="navbar-right">
              <FaPlus className="add-product-icon fs-3 me-3" onClick={handleAddProductClick} style={{ cursor: 'pointer' }} />
              <img src={cartIcon} alt="Cart" className="cart-icon" />
              <span className="mx-2"></span>
              <i className="profile-icon fs-2" onClick={handleProfileClick}>👤</i>
              {showDrawer && (
                <ProfileDrawer
                  isOpen={showDrawer}
                  onClose={handleCloseDrawer}
                  isAuthenticated={isAuthenticated}
                  userInfo={userInfo}
                  onLogout={onLogout}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
