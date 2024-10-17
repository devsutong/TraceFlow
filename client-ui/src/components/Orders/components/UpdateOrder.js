import React, { useState, useEffect } from 'react';
import { getOrder, updateOrder } from '../services/orderService';
import { useParams, useHistory } from 'react-router-dom';

const UpdateOrder = () => {
    const { id } = useParams();
    const history = useHistory();
    const [orderData, setOrderData] = useState({
        userID: '',
        totalAmount: '',
        status: '',
        products: []
    });

    useEffect(() => {
        const fetchOrder = async () => {
            const data = await getOrder(id);
            setOrderData(data);
        };
        fetchOrder();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateOrder(id, orderData);
        history.push('/my-orders');  // Redirect to the user's orders list after updating
    };

    return (
        <div>
            <h2>Update Order</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>User ID</label>
                    <input
                        type="text"
                        value={orderData.userID}
                        onChange={(e) => setOrderData({ ...orderData, userID: e.target.value })}
                        required
                        readOnly
                    />
                </div>
                <div>
                    <label>Total Amount</label>
                    <input
                        type="number"
                        value={orderData.totalAmount}
                        onChange={(e) => setOrderData({ ...orderData, totalAmount: e.target.value })}
                        required
                    />
                </div>
                <div>
                    <label>Status</label>
                    <input
                        type="text"
                        value={orderData.status}
                        onChange={(e) => setOrderData({ ...orderData, status: e.target.value })}
                        required
                    />
                </div>
                <button type="submit">Update Order</button>
            </form>
        </div>
    );
};

export default UpdateOrder;
