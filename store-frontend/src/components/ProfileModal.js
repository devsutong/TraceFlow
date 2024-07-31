import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ProfileModal({ show, handleClose, isAuthenticated, userInfo, onLogout, onUpdateProfile, onDeleteAccount }) {
  const [profilePic, setProfilePic] = useState(userInfo?.profilePic || '');
  const navigate = useNavigate(); // Define navigate

  const handleProfilePicUpload = (event) => {
    // Logic to handle file upload and update the profile picture
    const file = event.target.files[0];
    if (file) {
      // Implement file upload logic here
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose(); // Close the modal
  };

  const handleSignup = () => {
    navigate('/signup');
    handleClose(); // Close the modal
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
            <div className="d-flex justify-content-between">
              <Button variant="outline-secondary" onClick={onUpdateProfile}>Update Profile</Button>
              <Button variant="outline-danger" onClick={onDeleteAccount}>Delete Account</Button>
            </div>
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
