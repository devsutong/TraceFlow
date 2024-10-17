import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ViewOrdersModal = ({ show, onHide, orders, users }) => {
    const getUserName = (userID) => {
        const user = users.find(u => u.id === userID);
        return user ? user.firstName : 'Unknown User'
    };

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
                            <th>Customer Name</th>
                            <th>Total Amount (INR)</th>
                            <th>Products Ordered</th>
                            <th>Quantity</th>
                            <th>Images</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order.id}</td>
                                    <td>{getUserName(order.userID)}</td>
                                    <td>{order.totalAmount}</td>
                                    <td>
                                        {order.OrderItems.map(item => (
                                            <div key={item.Product.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <span style={{ marginRight: '5px' }}>{item.Product.name}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {order.OrderItems.map(item => (
                                            <div key={item.Product.id} style={{ marginBottom: '5px' }}>
                                                {item.quantity}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {order.OrderItems.map(item => (
                                            <div key={item.Product.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                                                <img 
                                                    src={item.Product.image} 
                                                    alt={item.Product.name} 
                                                    style={{ width: '50px', height: '50px', marginRight: '5px' }} 
                                                />
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <Button 
                                            variant="info" 
                                            size="sm" 
                                            className="me-2"
                                            onClick={() => console.log('Update order:', order)}
                                        >
                                            Update
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            size="sm" 
                                            onClick={() => console.log('Delete order:', order)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No orders available</td>
                            </tr>
                        )}
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
