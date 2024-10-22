import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/ProductDetails.css';

const ProductDetails = ({ productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(productId)
    const fetchProductDetails = async () => {
        const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get(`/product/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          });
        setProduct(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const imageUrl = product.image; // Assuming this is relative

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <img src={imageUrl} alt={product.name} className="product-image" />
      <p>{product.description}</p>
      <p>Price: {product.price} {product.priceUnit.toUpperCase()}</p>
      {/* Add other details like ratings, reviews, etc. */}
      {/* Buttons for quantity selection and add to cart */}
    </div>
  );
};

export default ProductDetails;
