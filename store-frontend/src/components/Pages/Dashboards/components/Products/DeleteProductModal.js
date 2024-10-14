import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DeleteProductModal = ({ show, onHide, product, onProductDeleted }) => {
  const handleDeleteProduct = async () => {
    try {
      await axios.delete(`/api/products/${product.id}`); // Adjust endpoint if needed
      onProductDeleted(); // Notify parent to remove product from state
      onHide(); // Close the modal
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the product: <strong>{product?.name}</strong>?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="danger" onClick={handleDeleteProduct}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteProductModal;
