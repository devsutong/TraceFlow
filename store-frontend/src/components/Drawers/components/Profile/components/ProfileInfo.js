// src/components/Drawers/ProfileInfo.js
import React from 'react';
import { Button } from 'react-bootstrap';

const ProfileInfo = ({ userInfo, onUpdateProfileClick, onDeleteAccount, onLogout }) => (
  <div className="text-center">
    <div className="d-flex flex-column align-items-center">
      <Button variant="outline-primary" className="mb-2" onClick={onUpdateProfileClick}>
        Update Profile
      </Button>
      <Button variant="outline-danger" className="mb-2" onClick={onDeleteAccount}>
        Delete Account
      </Button>
      <Button variant="outline-danger" onClick={onLogout}>
        Logout
      </Button>
    </div>
  </div>
);

export default ProfileInfo;
