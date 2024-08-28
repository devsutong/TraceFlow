// src/components/ProductCard.js
import React from 'react';
import './styles/ProductCard.css'; // Ensure the path is correct
import axios from 'axios'; // Import axios for making HTTP requests

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      // Replace `userId` with the actual user ID from your app's state or context
      const userId = 1; // Example user ID, replace this with actual value

      const response = await axios.post('/cart/add', {
        userId, // The user ID
        productId: product.id,
        quantity: 1 // Adjust this as needed
      });

      if (response.data.status) {
        alert('Product added to cart successfully!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('An error occurred while adding the product to the cart.');
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-price-container">
        <span className="product-price-unit">{product.priceUnit.toUpperCase()}</span>
        <span className="product-price">{product.price}</span>
      </div>
      <button className="buy-now-btn" onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
