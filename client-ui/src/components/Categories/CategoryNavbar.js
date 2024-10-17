import React, { useState, useEffect } from 'react';
import './styles/CategoryNavbar.css';

const CategoryNavbar = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/Categories.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Since Categories.json is an array with an object containing Categories
        setCategories(data[0].Categories || []); // Access the Categories array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="category-navbar">Loading...</div>;
  }

  if (error) {
    return <div className="category-navbar">{error}</div>;
  }

  return (
    <div className="category-navbar">
      <div className="container">
        <ul className="category-list">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                <a href={`#${category.name}`} className="category-link">
                  {category.name}
                </a>
              </li>
            ))
          ) : (
            <li className="category-item">No categories available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoryNavbar;
