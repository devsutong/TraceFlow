import axios from 'axios';

export const getOrders = async () => {
    const response = await axios.get(`/order/`);
    return response.data.data;
};

export const getOrder = async (id) => {
    const response = await axios.get(`/order/get/${id}`);
    return response.data.data;
};

export const createOrder = async (orderData) => {
    const response = await axios.post(`/create`, orderData);
    return response.data;
};

export const updateOrder = async (id, orderData) => {
    const response = await axios.patch(`/order/update/${id}`, orderData);
    return response.data;
};

export const deleteOrder = async (id) => {
    const response = await axios.delete(`/orders/${id}`);
    return response.data;
};
