import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import ProductForm from './ProductForm'; // Import ProductForm component
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../SellerDashboard/styles/sellerdashboard.css'; 
import logo from '../../../../Assets/logo.png'; // Import the logo

const SellerDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    priceUnit: 'inr',
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
    setSelectedCategory(id); // Set category ID as the selectedCategory
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
      const token = sessionStorage.getItem('authToken'); // Retrieve the token
      let imagePath = '';

      // If the image needs to be uploaded first
      if (productData.image) {
        const formData = new FormData();
        formData.append('image', productData.image);

        const uploadResponse = await axios.post('/upload/image/', formData, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the headers
          },
          onUploadProgress: progressEvent => {
            setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
          }
        });
        imagePath = uploadResponse.data.path; // Get the uploaded image path
      }

      // Build the payload
      const payload = {
        name: productData.name,
        description: productData.description,
        image: imagePath || productData.image, // Use the uploaded path or the provided URL
        price: parseFloat(productData.price), // Convert price to a number
        priceUnit: productData.priceUnit,
        categoryIds: [productData.categoryId] // Ensure this is an array
      };

      console.log('Sending payload:', payload); // Log the payload for debugging

      await axios.post('/product/', payload, {
        headers: {
          'Authorization': `Bearer ${token}` // Include the token in the headers
        }
      });

      setMessage('Product added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error.response?.data || error.message); // Improved error logging
      setMessage(`Error: ${error.response?.data?.message || error.message}`);
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
