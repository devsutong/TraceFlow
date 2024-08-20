import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import ProductCategoryDropdown from './ProductCategoryDropdown';
import ProductImageUpload from './ProductImageUpload';

const ProductForm = ({ productData, categories, selectedCategory, loading, onInputChange, onCategoryChange, onFileChange, onSubmit, uploadProgress, message }) => {
  return (
    <Form onSubmit={onSubmit} className="dashboard-form">
      <Form.Group>
        <Form.Label htmlFor="productName">Product Name</Form.Label>
        <Form.Control
          type="text"
          id="productName"
          name="name"
          value={productData.name}
          onChange={onInputChange}
          required
          autoComplete="off"
          className="dashboard-input"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="productDescription">Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          id="productDescription"
          name="description"
          value={productData.description}
          onChange={onInputChange}
          required
          autoComplete="off"
          className="dashboard-input"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="productPrice">Price</Form.Label>
        <Form.Control
          type="number"
          id="productPrice"
          name="price"
          value={productData.price}
          onChange={onInputChange}
          required
          autoComplete="off"
          className="dashboard-input"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="priceUnit">Price Unit</Form.Label>
        <Form.Control
          as="select"
          id="priceUnit"
          name="priceUnit"
          value={productData.priceUnit}
          onChange={onInputChange}
          autoComplete="off"
          className="dashboard-select"
        >
          <option value="inr">INR</option>
          <option value="usd">USD</option>
        </Form.Control>
      </Form.Group>
      <ProductCategoryDropdown
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        loading={loading}
      />
      <ProductImageUpload
        onFileChange={onFileChange}
        uploadProgress={uploadProgress}
      />
      <Button variant="primary" type="submit" className="dashboard-button">
        Add Product
      </Button>
      {message && <Alert variant="info">{message}</Alert>}
    </Form>
  );
};

export default ProductForm;
