import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal({ show, handleClose, isAuthenticated, userInfo, onLogout, onUpdateProfile, onDeleteAccount }) {
  const [profilePic, setProfilePic] = useState(userInfo?.profilePic || '');
  const [firstName, setFirstName] = useState(userInfo?.firstName || '');
  const [lastName, setLastName] = useState(userInfo?.lastName || '');
  const [age, setAge] = useState(userInfo?.age || '');
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const navigate = useNavigate();

  const handleProfilePicUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      // Implement file upload logic here if needed
    }
  };

  const handleUpdateProfile = async () => {
    if (typeof onUpdateProfile !== 'function') {
      console.error('onUpdateProfile is not a function');
      return;
    }
    try {
      await onUpdateProfile({ firstName, lastName, age, profilePic });
      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  const handleSignup = () => {
    navigate('/signup');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isAuthenticated ? 'Profile' : 'Login/Signup'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isAuthenticated ? (
          <>
            <div className="text-center mb-3">
              <img
                src={profilePic || 'default-profile-pic-url'} // Replace with a default picture URL
                alt="Profile"
                className="img-fluid rounded-circle"
                style={{ width: '150px', height: '150px' }}
              />
              <Form.Group className="mt-2">
                <Form.Label>Upload Profile Picture</Form.Label>
                <Form.Control type="file" onChange={handleProfilePicUpload} />
              </Form.Group>
            </div>
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
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="outline-secondary" onClick={handleUpdateProfile}>Update Profile</Button>
                </div>
              </Form>
            ) : (
              <div className="text-center">
                <Button variant="outline-primary" onClick={() => setShowUpdateForm(true)}>Update Profile</Button>
                <Button variant="outline-danger" className="mt-2" onClick={onDeleteAccount}>Delete Account</Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <Button variant="outline-primary" className="w-100 mb-2" onClick={handleLogin}>Login</Button>
            <Button variant="outline-secondary" className="w-100" onClick={handleSignup}>Signup</Button>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        {isAuthenticated && <Button variant="primary" onClick={onLogout}>Logout</Button>}
      </Modal.Footer>
    </Modal>
  );
}
