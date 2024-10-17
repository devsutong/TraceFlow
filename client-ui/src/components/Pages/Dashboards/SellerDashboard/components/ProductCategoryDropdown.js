import React from 'react';
import { Form, Dropdown } from 'react-bootstrap'; // Import Form here

const ProductCategoryDropdown = ({ categories, selectedCategory, onCategoryChange, loading }) => {
  return (
    <Form.Group>
      <Form.Label htmlFor="productCategories">Categories</Form.Label>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedCategory || "Select a category"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {loading ? (
            <Dropdown.Item>Loading categories...</Dropdown.Item>
          ) : Array.isArray(categories) && categories.length > 0 ? (
            categories.map(category => (
              <Dropdown.Item
                key={category.id}
                onClick={() => onCategoryChange(category.id, category.name)}
              >
                {category.name}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item>No categories available</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
};

export default ProductCategoryDropdown;
