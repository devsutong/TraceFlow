import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ProductForm from './ProductForm'; // Import ProductForm component
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../SellerDashboard/styles/sellerdashboard.css'; 
import logo from '../../../../Assets/logo.png' // Import the logo

const SellerDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    priceUnit: 'inr',
    categoryId: '', // Single category ID
    image: null
  });
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedCategory, setSelectedCategory] = useState(''); // Store selected category

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/Categories.json');
        if (response.data && response.data[0] && response.data[0].Categories) {
          setCategories(response.data[0].Categories);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCategoryChange = (id, name) => {
    setProductData(prevData => ({
      ...prevData,
      categoryId: id
    }));
    setSelectedCategory(name);
  };

  const handleFileChange = (e) => {
    setProductData(prevData => ({
      ...prevData,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imagePath = '';

      if (productData.image) {
        const formData = new FormData();
        formData.append('image', productData.image);

        const uploadResponse = await axios.post('/upload/image/', formData, {
          onUploadProgress: progressEvent => {
            setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        });
        imagePath = uploadResponse.data.path;
      }

      await axios.post('/product/', {
        ...productData,
        image: imagePath
      });

      setMessage('Product added successfully!');
      resetForm();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setProductData({
      name: '',
      description: '',
      price: '',
      priceUnit: 'inr',
      categoryId: '',
      image: null
    });
    setSelectedCategory('');
    setUploadProgress(0);
  };

  return (
    <Container className="dashboard-container">
      {loading ? (
        <Spinner animation="border" /> // Use Bootstrap spinner
      ) : (
        <Row>
          <Col md={8} lg={6} className="mx-auto">
            <header className="dashboard-header">
              <img src={logo} alt="TraceFlow Logo" className="logo" />
              <h2 className="header-title">Upload your Product</h2>
            </header>
            <ProductForm
              productData={productData}
              categories={categories}
              selectedCategory={selectedCategory}
              loading={loading}
              onInputChange={handleInputChange}
              onCategoryChange={handleCategoryChange}
              onFileChange={handleFileChange}
              onSubmit={handleSubmit}
              uploadProgress={uploadProgress}
              message={message}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SellerDashboard;
