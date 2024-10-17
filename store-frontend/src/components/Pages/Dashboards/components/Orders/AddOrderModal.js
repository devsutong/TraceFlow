import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddOrderModal = ({ show, onHide, onOrderAdded }) => {
  const [customerName, setCustomerName] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now().toString(),  // Simulating ID, use actual ID from server in real app
      customerName,
      total,
      status
    };
    onOrderAdded(newOrder);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter customer name" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter total amount" 
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter order status" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Add Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddOrderModal;
