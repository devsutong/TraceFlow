import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthOptions from './AuthOptions';
import SettingsDrawer from '../../Settings/components/SettingsDrawer'; // Import SettingsDrawer
import { Button } from 'react-bootstrap';
import { FaCog, FaShoppingCart, FaUserCircle, FaCrown } from 'react-icons/fa'; // Import FaCrown
import '../styles/ProfileDrawer.css';

const ProfileDrawer = ({ isOpen, onClose, isAuthenticated, userInfo, onLogout }) => {
  const [userName, setuserName] = useState('');
  const [showSettings, setShowSettings] = useState(false); // State to manage Settings view
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setuserName(userInfo.username);
    }
  }, [userInfo]);

  const handleOrdersClick = () => {
    navigate('/my-orders');
  };

  // Function to toggle to settings view
  const handleSettingsClick = () => {
    setShowSettings(true); // Show settings
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) return; // If the user cancels, do nothing

    try {
      const response = await fetch(`/user/${userInfo.id}`, { // Adjust the URL based on your API endpoint
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}` // Include your authorization token if needed
        }
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Show success message
        onLogout(); // Log the user out or navigate to login page
      } else {
        alert(result.error); // Show the error message
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('There was an error deleting your account. Please try again later.');
    }
  };

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''}`}>
      <div className="drawer-content">
        <button className="drawer-close" onClick={onClose}>X</button>
        <div className="drawer-top-content">
          {isAuthenticated ? (
            showSettings ? (
              <SettingsDrawer
                onClose={() => setShowSettings(false)} // Function to close settings
                onUpdateProfileClick={() => {
                  navigate('/update-profile');
                }}
                onDeleteAccount={handleDeleteAccount} // Include delete account logic here
                onBackClick={onClose} // Pass onClose to go back to ProfileDrawer
                onLogout={onLogout}
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
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" onClick={handleSettingsClick} className="mb-2 text-center">
                    <FaCog className="me-2" /> Profile Settings
                  </Button>
                  <Button variant="link" onClick={handleOrdersClick} className="text-center mb-2">
                    <FaShoppingCart className="me-2" /> Orders
                  </Button>
                  {userInfo.role === 'admin' && ( // Check if user is admin
                    <Button 
                      variant="link" 
                      onClick={() => navigate('/admin-dashboard')} 
                      className="text-center"
                    >
                      <FaCrown className="me-2" /> Admin Dashboard
                    </Button>
                  )}
                </div>
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
    </div>
  );
};

export default ProfileDrawer;
