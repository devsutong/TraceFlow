// src/components/ProductCard.js
import React, { useContext } from 'react';
import { CartContext } from '../Cart/CartContext'; // Import CartContext
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext); // Use CartContext

  const handleAddToCart = () => {
    addToCart(product); // Call the addToCart function from CartContext
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
