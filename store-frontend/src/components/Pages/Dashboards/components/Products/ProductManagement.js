import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import ViewProductsModal from './ViewProductsModal';
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import DeleteProductModal from './DeleteProductModal';
import axios from 'axios';

const ProductManagement = () => {
  const [showViewProducts, setShowViewProducts] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // For the update/delete actions
  const [products, setProducts] = useState([]); // State to hold the list of products

  useEffect(() => {
    // Fetch products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/'); // Adjust the endpoint as necessary
        setProducts(response.data.data); // Set products from response data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowUpdateProduct(true); // Show update modal when a product is selected
  };

  const handleProductDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteProduct(true); // Show delete modal when a product is selected
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="primary" size="lg" className="w-100">
          Products
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowViewProducts(true)}>View All Products</Dropdown.Item>
          <Dropdown.Item onClick={() => setShowAddProduct(true)}>Add Product</Dropdown.Item>
          {/* Removed Update and Delete options */}
        </Dropdown.Menu>
      </Dropdown>

      {/* Modals for product operations */}
      <ViewProductsModal 
        show={showViewProducts} 
        onHide={() => setShowViewProducts(false)} 
        products={products} // Pass products data to modal
        onProductSelect={handleProductSelect} // Pass function to handle product selection
        onProductDelete={handleProductDelete} // Pass function to handle product deletion
      />
      <AddProductModal 
        show={showAddProduct} 
        onHide={() => setShowAddProduct(false)} 
        onProductAdded={(newProduct) => setProducts([...products, newProduct])} // Add new product to the state
      />
      <UpdateProductModal 
        show={showUpdateProduct} 
        onHide={() => setShowUpdateProduct(false)} 
        product={selectedProduct} // Pass selected product data
        onProductUpdated={(updatedProduct) => {
          setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p))); // Update product in state
        }}
      />
      <DeleteProductModal 
        show={showDeleteProduct} 
        onHide={() => setShowDeleteProduct(false)} 
        product={selectedProduct} // Pass selected product data
        onProductDeleted={() => {
          setProducts(products.filter(p => p.id !== selectedProduct.id)); // Remove product from state
          setSelectedProduct(null); // Clear selection after deletion
        }} 
      />
    </>
  );
};

export default ProductManagement;
