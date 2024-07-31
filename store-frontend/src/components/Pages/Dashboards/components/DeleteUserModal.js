import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Spinner from './../../../Spinner';

const DeleteUserModal = ({ show, onHide }) => {
  const [userId, setUserId] = useState(''); // State for the user ID input
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    const token = sessionStorage.getItem('authToken');

    if (!token) {
      setError('No token found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error.message || 'Failed to delete user');
      } else {
        // Successfully deleted
        alert('User deleted successfully!');
        setUserId(''); // Clear input field
        onHide(); // Close the modal
      }
    } catch (err) {
      setError('An error occurred while deleting the user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Spinner />} {/* Show spinner while loading */}
        {error && <p className="error-message">{error}</p>}
        <Form>
          <Form.Group controlId="formUserId">
            <Form.Label>Enter User ID to Delete</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter user ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          Delete User
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
