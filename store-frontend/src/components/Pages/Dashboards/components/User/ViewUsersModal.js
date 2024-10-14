import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import Spinner from './../../../../Spinner';

const ViewUsersModal = ({ show, onHide }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        const token = sessionStorage.getItem('authToken'); // Retrieve token from sessionStorage

        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        try {
          const response = await fetch('/user/all', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include token in the headers
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.error.message || 'Failed to fetch users');
            setUsers([]); // Clear users on error
          } else {
            const data = await response.json();
            setUsers(data.data || []);
          }
        } catch (err) {
          setError('An error occurred while fetching users');
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View All Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading && <Spinner />} {/* Show spinner while loading */}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>{user.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No users found</td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewUsersModal;
