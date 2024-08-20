// src/components/Drawers/AuthOptions.js
import React from 'react';
import { Button } from 'react-bootstrap';

const AuthOptions = ({ onLoginClick, onSignupClick }) => (
  <div className="text-center">
    <Button variant="outline-primary" className="w-100 mb-2" onClick={onLoginClick}>Login</Button>
    <Button variant="outline-secondary" className="w-100" onClick={onSignupClick}>Signup</Button>
  </div>
);

export default AuthOptions;
