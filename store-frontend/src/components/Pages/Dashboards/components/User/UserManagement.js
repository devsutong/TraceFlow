import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserEdit, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import ViewUsersModal from './ViewUsersModal';
import UpdateUserModal from './UpdateUserModal';
import DeleteUserModal from './DeleteUserModal';
import './styles/UserManagement.css'; // Ensure this path is correct

const UserManagement = () => {
  const [showViewUsers, setShowViewUsers] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  return (
    <>
      <Dropdown className="user-dropdown">
        <Dropdown.Toggle variant="primary" size="lg" className="w-100 custom-dropdown-toggle">
          <FontAwesomeIcon icon={faUsers} className="me-2" />
          Users
        </Dropdown.Toggle>
        <Dropdown.Menu className="custom-dropdown-menu">
          <Dropdown.Item onClick={() => setShowViewUsers(true)}>
            <FontAwesomeIcon icon={faUsers} className="me-2" /> View All Users
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowUpdateUser(true)}>
            <FontAwesomeIcon icon={faUserEdit} className="me-2" /> Update User
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowDeleteUser(true)}>
            <FontAwesomeIcon icon={faUserTimes} className="me-2" /> Delete User
          </Dropdown.Item>
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
