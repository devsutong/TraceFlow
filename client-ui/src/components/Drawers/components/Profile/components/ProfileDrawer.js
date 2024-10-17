import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthOptions from './AuthOptions';
import SettingsDrawer from '../../Settings/components/SettingsDrawer';
import UpdateProfileForm from './UpdateProfileForm'; // Import UpdateProfileForm
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxes} from '@fortawesome/free-solid-svg-icons';
import { FaCog, FaShoppingCart, FaUserCircle, FaCrown } from 'react-icons/fa';
import '../styles/ProfileDrawer.css';

const ProfileDrawer = ({ isOpen, onClose, isAuthenticated, userInfo, onLogout }) => {
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [showSettings, setShowSettings] = useState(false); // State to manage Settings view
  const [showUpdateProfile, setShowUpdateProfile] = useState(false); // State for showing UpdateProfileForm
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.username);
      setFirstName(userInfo.firstName || ''); // Initialize the form fields with user info
      setLastName(userInfo.lastName || '');
      setAge(userInfo.age || '');
    }
  }, [userInfo]);
  const handleOrdersClick = () => {
    navigate('/my-orders');
  };

  // Function to toggle to settings view
  const handleSettingsClick = () => {
    setShowSettings(true); // Show settings
  };

  const handleUpdateProfileClick = () => {
    setShowUpdateProfile(true); // Show the update profile form
  };

  // Function to handle profile update
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/user/', {
        method: 'PATCH', // Use PUT or PATCH based on your API
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Profile updated successfully!');
        setShowUpdateProfile(false); // Hide the update form after success
        // Update user info in parent state or refetch if needed
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile. Please try again later.');
    }
  };
  
  // Define the handleDeleteAccount function here
  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (!confirmation) return;

    try {
      const response = await fetch(`/user/${userInfo.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        onLogout(); // Log the user out after successful deletion
        navigate('/login'); // Redirect to login or home page
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('There was an error deleting your account. Please try again later.');
    }
  };

  const handleCancelUpdate = () => {
    setShowUpdateProfile(false); // Hide the update form if canceled
  };

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''}`}>
      <div className="drawer-content">
        <button className="drawer-close" onClick={onClose}>X</button>
        <div className="drawer-top-content">
          {isAuthenticated ? (
            showUpdateProfile ? (
              <UpdateProfileForm
                firstName={firstName}
                lastName={lastName}
                age={age}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setAge={setAge}
                onUpdateProfile={handleUpdateProfile}
                onCancel={handleCancelUpdate}
              />
            ) : showSettings ? (
              <SettingsDrawer
                onClose={() => setShowSettings(false)}
                onUpdateProfileClick={handleUpdateProfileClick}
                onDeleteAccount={handleDeleteAccount} // Pass delete account logic here
                onBackClick={onClose}
                onLogout={onLogout}
              />
            ) : (
              <>
                <div className="mb-3">
                  {userInfo?.profilePic ? (
                    <img
                      src={userInfo.profilePic}
                      alt="Profile"
                      className="img-fluid rounded-circle"
                      style={{ width: '150px', height: '150px' }}
                    />
                  ) : (
                    <FaUserCircle size={150} />
                  )}
                  <h4>{userName}</h4>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <Button variant="link" onClick={handleSettingsClick} className="mb-2 text-center">
                    <FaCog className="me-2" /> Profile Settings
                  </Button>
                  <Button variant="link" onClick={handleOrdersClick} className="text-center mb-2">
                    <FaShoppingCart className="me-2" /> My Orders
                  </Button>
                  {userInfo.role === 'admin' && (
                    <Button
                      variant="link"
                      onClick={() => navigate('/admin-dashboard')}
                      className="text-center"
                    >
                      <FaCrown className="me-2" /> Go to Admin Dashboard
                    </Button>
                  )}
                   {userInfo.role === 'seller' && (
                    <Button
                      variant="link"
                      onClick={() => navigate('/')}
                      className="text-center"
                    >
                      <FontAwesomeIcon icon={faBoxes}className="me-2" /> My Products
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
