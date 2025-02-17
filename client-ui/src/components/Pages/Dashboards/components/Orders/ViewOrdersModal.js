import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

const ViewOrdersModal = ({ show, onHide, orders, users, onOrderSelect, onOrderDelete }) => {
    const getUserName = (userID) => {
        const user = users.find(u => u.id === userID);
        return user ? user.firstName : 'Unknown User';
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
                                            <div key={item.Product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px', marginRight: '10px'}}>
                                                <span>{item.Product.name}</span>
                                                <span>X{item.quantity}</span>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No orders available</td>
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
