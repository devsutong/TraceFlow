import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateOrderModal = ({ show, onHide, order, onOrderUpdated }) => {
  const [customerName, setCustomerName] = useState('');
  const [total, setTotal] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) {
      setCustomerName(order.customerName);
      setTotal(order.total);
      setStatus(order.status);
    }
  }, [order]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...order,
      customerName,
      total,
      status
    };
    onOrderUpdated(updatedOrder);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Customer Name</Form.Label>
            <Form.Control 
              type="text" 
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total Amount</Form.Label>
            <Form.Control 
              type="number" 
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control 
              type="text" 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Update Order
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateOrderModal;
