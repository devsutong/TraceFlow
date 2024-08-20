// src/components/Drawers/UpdateProfileForm.js
import React from 'react';
import { Button, Form } from 'react-bootstrap';

const UpdateProfileForm = ({ firstName, lastName, age, setFirstName, setLastName, setAge, onUpdateProfile, onCancel }) => (
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
      <Button variant="outline-secondary" onClick={onUpdateProfile}>Update Profile</Button>
      <Button variant="outline-danger" onClick={onCancel}>Cancel</Button>
    </div>
  </Form>
);

export default UpdateProfileForm;
