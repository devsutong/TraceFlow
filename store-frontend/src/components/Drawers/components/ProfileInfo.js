// src/components/Drawers/ProfileInfo.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

const ProfileInfo = ({ userInfo, onUpdateProfileClick, onDeleteAccount, onLogout }) => (
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
    <Button variant="outline-primary" className="mb-2 mx-2" onClick={onUpdateProfileClick}>Update Profile</Button>
    <Button variant="outline-danger" className="mb-2 mx-2" onClick={onDeleteAccount}>Delete Account</Button>
    <Button variant="outline-danger" className="mb-2 mx-2" onClick={onLogout}>Logout</Button>
  </div>
);

export default ProfileInfo;
