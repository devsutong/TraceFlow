// src/components/ProductCard.js
import React from 'react';
import './styles/ProductCard.css'; // You can keep the CSS specific to this component

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price} per {product.priceUnit}</p>
      <button className="buy-now-btn">Buy Now</button>
    </div>
  );
};

export default ProductCard;
