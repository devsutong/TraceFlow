import React, { useState } from 'react';
import ProfileDrawer from '../../Drawers/components/Profile/components/ProfileDrawer'; // Import the ProfileDrawer component
import logo from '/home/ibitfnehu/TraceFlow/store-frontend/src/components/Assets/logo.png'; // Adjust path if necessary
import cartIcon from '/home/ibitfnehu/TraceFlow/store-frontend/src/components/Assets/cart_icon.png'; // Import the cart icon
import '../styles/navbar.css'; // Ensure this path is correct

export default function Navbar({ isAuthenticated, userInfo, onLogout }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const handleProfileClick = () => {
    setShowDrawer(!showDrawer); // Toggle drawer visibility
  };

  const handleCloseDrawer = () => {
    setShowDrawer(false);
  };

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
              <img src={cartIcon} alt="Cart" className="cart-icon" /> {/* Use the new cart icon */}
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
