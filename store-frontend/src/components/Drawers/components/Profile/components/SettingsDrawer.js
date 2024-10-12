// SettingsDrawer.js
import React from 'react';
import { Button } from 'react-bootstrap';
import ProfileInfo from './ProfileInfo';

const SettingsDrawer = ({ onUpdateProfileClick, onDeleteAccount,userInfo }) => {
  return (
    <div className="settings-drawer">
      <h3>Settings</h3>
      <ProfileInfo userInfo={userInfo} />
    </div>
  );
};

export default SettingsDrawer;
