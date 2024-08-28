// src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/cart/');
        if (response.data.status) {
          setCartItems(response.data.data);
        } else {
          setError('Failed to fetch cart items');
        }
      } catch (error) {
        setError('Error fetching cart items');
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(item => item.id === product.id);
      if (existingProduct) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await axios.post('/cart/remove', { productId });
      if (response.data.status) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      } else {
        alert('Failed to remove item from cart');
      }
    } catch (error) {
      alert('Error removing item from cart');
      console.error('Error removing item from cart:', error);
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      const response = await axios.post('/cart/update', { productId, quantity: newQuantity });
      if (response.data.status) {
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        alert('Failed to update item quantity');
      }
    } catch (error) {
      alert('Error updating item quantity');
      console.error('Error updating item quantity:', error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItem, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};
