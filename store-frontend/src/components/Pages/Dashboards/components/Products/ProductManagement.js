import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import ViewProductsModal from './ViewProductsModal';
import AddProductModal from './AddProductModal';
import UpdateProductModal from './UpdateProductModal';
import DeleteProductModal from './DeleteProductModal';
import axios from 'axios';
import './styles/ProductManagement.css';

const ProductManagement = () => {
  const [showViewProducts, setShowViewProducts] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/product/');
        setProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setShowUpdateProduct(true);
  };

  const handleProductDelete = (product) => {
    setSelectedProduct(product);
    setShowDeleteProduct(true);
  };

  return (
    <>
      <Dropdown className="product-dropdown">
        <Dropdown.Toggle variant="primary" size="lg" className="w-100 custom-dropdown-toggle">
          <FontAwesomeIcon icon={faBox} className="me-2" />
          Products
        </Dropdown.Toggle>
        <Dropdown.Menu className="custom-dropdown-menu">
          <Dropdown.Item onClick={() => setShowViewProducts(true)}>
            <FontAwesomeIcon icon={faBox} className="me-2" /> View All Products
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setShowAddProduct(true)}>
            <FontAwesomeIcon icon={faPlusCircle} className="me-2" /> Add Product
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Modals for product operations */}
      <ViewProductsModal 
        show={showViewProducts} 
        onHide={() => setShowViewProducts(false)} 
        products={products} 
        onProductSelect={handleProductSelect} 
        onProductDelete={handleProductDelete} 
      />
      <AddProductModal 
        show={showAddProduct} 
        onHide={() => setShowAddProduct(false)} 
        onProductAdded={(newProduct) => setProducts([...products, newProduct])} 
      />
      <UpdateProductModal 
        show={showUpdateProduct} 
        onHide={() => setShowUpdateProduct(false)} 
        product={selectedProduct} 
        onProductUpdated={(updatedProduct) => {
          setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
        }}
      />
      <DeleteProductModal 
        show={showDeleteProduct} 
        onHide={() => setShowDeleteProduct(false)} 
        product={selectedProduct} 
        onProductDeleted={() => {
          setProducts(products.filter(p => p.id !== selectedProduct.id));
          setSelectedProduct(null);
        }} 
      />
    </>
  );
};

export default ProductManagement;
