import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../Products/ProductCard'; 
import Spinner from '../../Spinner'; 
import '../styles/home.css'; 

const ROWS_PER_PAGE = 3;
const ITEMS_PER_ROW = 4;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [visibleItems, setVisibleItems] = useState(ROWS_PER_PAGE * ITEMS_PER_ROW);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/');
        const productData = response.data.data;
        setProducts(Array.isArray(productData) ? productData : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleItems((prev) => Math.min(prev + ROWS_PER_PAGE * ITEMS_PER_ROW, products.length));
      setLoading(false);
    }, 1000);
  };

  const productsToShow = products.slice(0, visibleItems);

  return (
    <div className="home-container">
      {loading ? (
        <Spinner />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {productsToShow.length > 0 ? (
            <>
              <div className="products-grid">
                {productsToShow.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {!loading && visibleItems < products.length && (
                <button className="load-more-btn" onClick={handleLoadMore}>
                  Load More
                </button>
              )}
            </>
          ) : (
            <p>No products available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
