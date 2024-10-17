import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteOrderModal = ({ show, onHide, order, onOrderDeleted }) => {
  // Check if order is not null or undefined before rendering content
  if (!order) {
    return null; // Or render an empty state / loading state here
  }

  const handleDelete = () => {
    onOrderDeleted(order);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the order for <strong>{order.customerName}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteOrderModal;
