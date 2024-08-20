import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import AuthOptions from './AuthOptions';
import UpdateProfileForm from './UpdateProfileForm';
import { Button, Alert } from 'react-bootstrap';
import { FaExclamationCircle, FaCog } from 'react-icons/fa'; // Import icons
import '../styles/ProfileDrawer.css'; // Ensure this path is correct

const ProfileDrawer = ({ isOpen, onClose, isAuthenticated, userInfo, onLogout }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      setFirstName(userInfo.firstName || '');
      setLastName(userInfo.lastName || '');
      setAge(userInfo.age || '');
    }
  }, [userInfo]);

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch('/user/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          age: Number(age),
          firstName,
          lastName
        }),
      });

      if (!response.ok) {
        throw new Error('Profile update failed');
      }

      const data = await response.json();
      console.log('Profile updated successfully:', data);
      setSuccessMessage('Profile updated successfully');
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setErrorMessage(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(`/user/${userInfo.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Account deletion failed');
      }

      const data = await response.json();
      console.log('Account deleted successfully:', data);
      onLogout();
    } catch (error) {
      console.error('Error deleting account:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={`drawer ${isOpen ? 'drawer-open' : ''}`}>
      <div className="drawer-content">
        <button className="drawer-close" onClick={onClose}>X</button>
        <div className="drawer-top-content">
          {isAuthenticated ? (
            <>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              {showUpdateForm ? (
                <UpdateProfileForm
                  firstName={firstName}
                  lastName={lastName}
                  age={age}
                  setFirstName={setFirstName}
                  setLastName={setLastName}
                  setAge={setAge}
                  onUpdateProfile={handleUpdateProfile}
                  onCancel={() => setShowUpdateForm(false)}
                />
              ) : (
                <ProfileInfo
                  userInfo={userInfo}
                  onUpdateProfileClick={() => setShowUpdateForm(true)}
                  onDeleteAccount={handleDeleteAccount}
                  onLogout={onLogout}
                />
              )}
            </>
          ) : (
            <AuthOptions
              onLoginClick={() => navigate('/login')}
              onSignupClick={() => navigate('/signup')}
            />
          )}
        </div>
      </div>
      <div className="drawer-footer">
        <Button variant="link" onClick={() => navigate('/about')}>
          <FaExclamationCircle className="me-2" /> About
        </Button>
        <Button variant="link" onClick={() => navigate('/settings')}>
          <FaCog className="me-2" /> Settings
        </Button>
      </div>
    </div>
  );
};

export default ProfileDrawer;
