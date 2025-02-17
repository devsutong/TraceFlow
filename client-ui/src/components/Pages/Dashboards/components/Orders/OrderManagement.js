import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import ViewOrdersModal from './ViewOrdersModal';
import AddOrderModal from './AddOrderModal';
import UpdateOrderModal from './UpdateOrderModal';
import DeleteOrderModal from './DeleteOrderModal';
import axios from 'axios';
import './styles/OrderManagement.css';

const OrderManagement = () => {
    const [users, setUsers] = useState([]); // State for storing users
    const [orders, setOrders] = useState([]); // State for storing orders
    const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order
    const [showViewOrders, setShowViewOrders] = useState(false);
    const [showAddOrder, setShowAddOrder] = useState(false);
    const [showUpdateOrder, setShowUpdateOrder] = useState(false);
    const [showDeleteOrder, setShowDeleteOrder] = useState(false);
    const [orderError, setOrderError] = useState(null); // Error for fetching orders
    const [userError, setUserError] = useState(null); // Error for fetching users
    const [authError, setAuthError] = useState(null); // Error for authentication issues

    useEffect(() => {
        // Fetch orders and users when the component loads
        const fetchOrders = async () => {
            const token = sessionStorage.getItem('authToken'); // Retrieve token from session storage
            if (!token) {
                setAuthError('Authentication token missing');
                return;
            }

            try {
                const response = await axios.get('/order/', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in headers
                    }
                });
                setOrders(response.data.data); // Set orders if successful
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setAuthError('Unauthorized access, please login again.');
                } else {
                    setOrderError('Error fetching orders');
                    console.error('Error fetching orders:', error);
                }
            }
        };

        const fetchUsers = async () => {
            const token = sessionStorage.getItem('authToken'); // Retrieve token from session storage
            if (!token) {
                setAuthError('Authentication token missing');
                return;
            }

            try {
                const response = await axios.get('/user/all', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include token in headers
                    }
                });
                setUsers(response.data.data); // Set users if successful
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setAuthError('Unauthorized access, please login again.');
                } else {
                    setUserError('Error fetching users');
                    console.error('Error fetching users:', error);
                }
            }
        };

        fetchOrders();
        fetchUsers();
    }, []);

    // Handlers for selecting and deleting orders
    const handleOrderSelect = (order) => {
        setSelectedOrder(order);
        setShowUpdateOrder(true);
    };

    const handleOrderDelete = (order) => {
        setSelectedOrder(order);
        setShowDeleteOrder(true);
    };

    return (
        <>
            <Dropdown className="order-dropdown">
                <Dropdown.Toggle variant="primary" size="lg" className="w-100 custom-dropdown-toggle">
                    <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                    Orders
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu">
                    <Dropdown.Item onClick={() => setShowViewOrders(true)}>
                        <FontAwesomeIcon icon={faClipboardList} className="me-2" /> View All Orders
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setShowAddOrder(true)}>
                        <FontAwesomeIcon icon={faPlusCircle} className="me-2" /> Add Order
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            {/* Modals for order operations */}
            <ViewOrdersModal
                show={showViewOrders}
                onHide={() => setShowViewOrders(false)}
                orders={orders}
                users={users}
                onOrderSelect={handleOrderSelect}
                onOrderDelete={handleOrderDelete}
            />
            <AddOrderModal
                show={showAddOrder}
                onHide={() => setShowAddOrder(false)}
                onOrderAdded={(newOrder) => setOrders([...orders, newOrder])}
            />
            <UpdateOrderModal
                show={showUpdateOrder}
                onHide={() => setShowUpdateOrder(false)}
                order={selectedOrder}
                onOrderUpdated={(updatedOrder) => {
                    setOrders(orders.map(o => (o.id === updatedOrder.id ? updatedOrder : o)));
                }}
            />
            <DeleteOrderModal
                show={showDeleteOrder}
                onHide={() => setShowDeleteOrder(false)}
                order={selectedOrder}
                onOrderDeleted={() => {
                    setOrders(orders.filter(o => o.id !== selectedOrder.id));
                    setSelectedOrder(null);
                }}
            />

            {/* Error Handling UI */}
            {authError && <div className="error-message">{authError}</div>}
            {orderError && <div className="error-message">{orderError}</div>}
            {userError && <div className="error-message">{userError}</div>}
        </>
    );
};

export default OrderManagement;
