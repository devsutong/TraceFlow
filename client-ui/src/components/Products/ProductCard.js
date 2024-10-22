// src/components/Products/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const handleAddToCart = () => {
    
    console.log(`${product.name} added to cart`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="product-price-container">
        <span className="product-price-unit">{product.priceUnit.toUpperCase()}</span>
        <span className="product-price">{product.price}</span>
      </div>
      <button className="buy-now-btn" onClick={handleAddToCart}>
        Add to cart
      </button>
      <Link to={`/product/${product.id}`} className="view-details-btn">View Details</Link>
    </div>
  );
};

export default ProductCard;
