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
    const [user,setUser] = useState(false);
    const [showViewOrders, setShowViewOrders] = useState(false);
    const [showAddOrder, setShowAddOrder] = useState(false);
    const [showUpdateOrder, setShowUpdateOrder] = useState(false);
    const [showDeleteOrder, setShowDeleteOrder] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
        try {
            const response = await axios.get('/order/');
            setOrders(response.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
        };
        fetchOrders();
        const fetchUser = async()=>{
            try {
                const response = await axios.get('/user/all');
                setUser(response.data.data);
            } catch (error){
                console.error('Error fetching users:', error);
            }
        };
        fetchUser();
    }, []);

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
            users={user}
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
        </>
    );
    };

    export default OrderManagement;
