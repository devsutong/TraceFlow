import React, { useState } from 'react';
import productsData from '../../Products/Products.json'; // Adjust the path accordingly
import ProductCard from '../../Products/ProductCard';
import Spinner from '../../Spinner'; // Import the Spinner component
import '../styles/home.css';

const ITEMS_PER_ROW = 4; // Number of items per row
const ROWS_PER_PAGE = 3; // Number of rows to load per button click

const Home = () => {
  // Calculate the number of items to show initially (3 rows x ITEMS_PER_ROW items per row)
  const [visibleItems, setVisibleItems] = useState(ROWS_PER_PAGE * ITEMS_PER_ROW);
  const [loading, setLoading] = useState(false); // Loading state

  const handleLoadMore = () => {
    setLoading(true); // Show spinner when loading starts
    setTimeout(() => { // Simulate network request
      setVisibleItems((prev) => Math.min(prev + ROWS_PER_PAGE * ITEMS_PER_ROW, productsData.products.length));
      setLoading(false); // Hide spinner when loading is complete
    }, 1000); // Simulated delay
  };

  // Determine which products to display based on visibleItems
  const productsToShow = productsData.products.slice(0, visibleItems);


  return (
    <div className="home-container">
      <div className="products-grid">
        {productsToShow.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
      {loading && <Spinner />} {/* Conditionally render the spinner */}
      {!loading && visibleItems < productsData.products.length && (
        <button className="load-more-btn" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default Home;
