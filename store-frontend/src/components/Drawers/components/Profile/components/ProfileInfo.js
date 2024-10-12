// src/components/Drawers/ProfileInfo.js
import React from 'react';
import { Button } from 'react-bootstrap';


const ProfileInfo = ({ userInfo, onUpdateProfileClick, onDeleteAccount, onLogout }) => (
  <div className="text-center">
    <Button variant="outline-primary" className="mb-2 mx-2" onClick={onUpdateProfileClick}>Update Profile</Button>
    <Button variant="outline-danger" className="mb-2 mx-2" onClick={onDeleteAccount}>Delete Account</Button>
    <Button variant="outline-danger" className="mb-2 mx-2" onClick={onLogout}>Logout</Button>
  </div>
);

export default ProfileInfo;
