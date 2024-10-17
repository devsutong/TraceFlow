import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ViewOrdersModal = ({ show, onHide, orders, users,
    onOrderSelect, onOrderDelete }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>All Orders</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Total Amount(INR)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.id}</td>
                <td>{order.userID}</td>
                <td>{order.totalAmount}</td>
                <td>{order.status}</td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm" 
                    className="me-2" 
                    onClick={() => onOrderSelect(order)}
                  >
                    Update
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => onOrderDelete(order)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOrdersModal;
