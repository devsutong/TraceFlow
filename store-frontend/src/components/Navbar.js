import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/navbar.css';

export default function Navbar({ isAuthenticated, userInfo, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileHover = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogin = () => {
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsDropdownOpen(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Traceflow</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
            </ul>
            <div className="navbar-center">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" id="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
            <div className="navbar-right">
              <i className="cart-icon fs-2">🛒</i>
              <span className="mx-2"></span> {/* Add space between icons */}
              <i className="profile-icon fs-2" onClick={handleProfileClick} onMouseEnter={handleProfileHover}>👤</i>
              {isDropdownOpen && (
                <div className="profile-dropdown">
                  {isAuthenticated ? (
                    <div className="dropdown-content">
                      {userInfo && <div className="user-info"><p>{userInfo.username}</p></div>}
                      <button onClick={onLogout}>Logout</button>
                    </div>
                  ) : (
                    <div className="dropdown-content">
                      <button onClick={handleLogin}>Login</button>
                      <button onClick={handleSignup}>Signup</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
