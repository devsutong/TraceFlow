import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './styles/ProfileDrawer.css'; // Add your custom styles for the drawer

const ProfileDrawer = ({ isOpen, onClose, isAuthenticated, userInfo, onLogout }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate

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
        {isAuthenticated ? (
          <>
            {successMessage && <Alert variant="success">{successMessage}</Alert>}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            {showUpdateForm ? (
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="outline-secondary" onClick={handleUpdateProfile}>Update Profile</Button>
                  <Button variant="outline-danger" onClick={() => setShowUpdateForm(false)}>Cancel</Button>
                </div>
              </Form>
            ) : (
              <div className="text-center">
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
                </div>
                <Button variant="outline-primary" className="mb-2 mx-2" onClick={() => setShowUpdateForm(true)}>Update Profile</Button>
                <Button variant="outline-danger" className="mb-2 mx-2" onClick={handleDeleteAccount}>Delete Account</Button>
                <Button variant="outline-danger" className="mb-2 mx-2" onClick={onLogout}>Logout</Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <Button variant="outline-primary" className="w-100 mb-2" onClick={() => navigate('/login')}>Login</Button>
            <Button variant="outline-secondary" className="w-100" onClick={() => navigate('/signup')}>Signup</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDrawer;
