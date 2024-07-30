import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const DeleteUserModal = ({ show, onHide }) => {
  const [userId, setUserId] = useState('');

  const handleDelete = () => {
    axios.delete(`/user/${userId}`)
      .then(response => {
        alert('User deleted successfully!');
        onHide();
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user ID to delete"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        <Button variant="danger" onClick={handleDelete}>Delete User</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
