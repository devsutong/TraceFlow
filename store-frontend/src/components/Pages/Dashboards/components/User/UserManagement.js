import React, { useState } from 'react';
import {Dropdown } from 'react-bootstrap';
import ViewUsersModal from './ViewUsersModal'; 
import UpdateUserModal from './UpdateUserModal'; 
import DeleteUserModal from './DeleteUserModal'; 

const UserManagement = () => {
  const [showViewUsers, setShowViewUsers] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="primary" size="lg" className="w-100">
          Users
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowViewUsers(true)}>View All Users</Dropdown.Item>
          <Dropdown.Item onClick={() => setShowUpdateUser(true)}>Update User</Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteUser(true)}>Delete User</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Modals for user operations */}
      <ViewUsersModal show={showViewUsers} onHide={() => setShowViewUsers(false)} />
      <UpdateUserModal show={showUpdateUser} onHide={() => setShowUpdateUser(false)} />
      <DeleteUserModal show={showDeleteUser} onHide={() => setShowDeleteUser(false)} />
    </>
  );
};

export default UserManagement;
