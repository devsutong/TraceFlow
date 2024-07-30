import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import '../../styles/admindashboard.css';

// Import UserManagement Component
import UserManagement from './components/UserManagement';

const AdminDashboard = () => {
  return (
    <Container className="d-flex flex-column vh-100">
      <Card className="text-center mb-4">
        <Card.Body>
          <Card.Title>Welcome, Admin!</Card.Title>
          <Card.Text>Manage your admin tasks from here.</Card.Text>
        </Card.Body>
      </Card>
      <Container className="d-flex flex-grow-1">
        <Row className="m-auto text-center">
          <Col md={4} className="mb-3">
            <UserManagement />
          </Col>
          <Col md={4} className="mb-3">
            <Button variant="success" size="lg" className="w-100">Products</Button>
          </Col>
          <Col md={4} className="mb-3">
            <Button variant="warning" size="lg" className="w-100">Categories</Button>
          </Col>
          <Col md={4} className="mb-3">
            <Button variant="danger" size="lg" className="w-100">Orders</Button>
          </Col>
          <Col md={4} className="mb-3">
            <Button variant="info" size="lg" className="w-100">Payment History</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AdminDashboard;
