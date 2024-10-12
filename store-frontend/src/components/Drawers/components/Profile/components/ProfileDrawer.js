import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthOptions from './AuthOptions';
import SettingsDrawer from './SettingsDrawer'; // Import SettingsDrawer
import { Button } from 'react-bootstrap';
import { FaCog, FaShoppingCart } from 'react-icons/fa';
import '../styles/ProfileDrawer.css';
import { FaUserCircle } from 'react-icons/fa';

const ProfileDrawer = ({ isOpen, onClose, isAuthenticated, userInfo, onLogout }) => {
  const [userName, setuserName] = useState('');
  const [showSettings, setShowSettings] = useState(false); // State to manage Settings view
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setuserName(userInfo.username);
      console.log(userInfo);
      console.log(userName);
    }
  }, [userInfo]);

  const handleOrdersClick = () => {
    navigate('/my-orders');
  };

  // Function to toggle to settings view
  const handleSettingsClick = () => {
    setShowSettings(true); // Show settings
  };

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''}`}>
      <div className="drawer-content">
        <button className="drawer-close" onClick={onClose}>X</button>
        <div className="drawer-top-content">
          {isAuthenticated ? (
            showSettings ? ( // Check if settings view should be shown
              <SettingsDrawer
                onClose={() => setShowSettings(false)} // Function to close settings
                onUpdateProfileClick={() => {
                  // Handle navigation to update profile here
                  navigate('/update-profile');
                }}
                onDeleteAccount={() => {
                  // Handle account deletion logic here
                }}
              />
            ) : (
              <>
                <div className="mb-3">
                  {userInfo && userInfo.profilePic ? (
                    <img
                      src={userInfo.profilePic}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{ width: '150px', height: '150px' }}
                    />
                  ) : (
                    <FaUserCircle size={150} />
                  )}
                  <h4>{`${userName}`}</h4>
              </div>
                <Button variant="link" onClick={handleSettingsClick}>
                  <FaCog className="me-2" /> Settings
                </Button>
                <Button variant="link" onClick={handleOrdersClick}>
                  <FaShoppingCart className="me-2" /> Orders
                </Button>
              </>
            )
          ) : (
            <AuthOptions
              onLoginClick={() => navigate('/login')}
              onSignupClick={() => navigate('/signup')}
            />
          )}
        </div>
      </div>
      <div className="drawer-footer">
        <Button variant="link" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default ProfileDrawer;
