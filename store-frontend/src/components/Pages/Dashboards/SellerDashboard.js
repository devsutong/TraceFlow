import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Alert, Dropdown } from 'react-bootstrap';
import Spinner from '../../Spinner'; // Import Spinner component
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/sellerdashboard.css'; 

const SellerDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    priceUnit: 'inr',
    categoryId: '', // Update to handle single category selection
    image: null
  });
  const [message, setMessage] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showCategories, setShowCategories] = useState(false); // State to toggle category dropdown visibility

  useEffect(() => {
    // Mock fetching categories from backend using provided JSON data
    const fetchCategories = async () => {
      try {
        // Simulate API response
        const response = {
          data: {
            Categories: [
              { id: 1, name: "Computer Accessories" },
              { id: 2, name: "Fashion" },
              { id: 3, name: "Electronics and Appliances" },
              { id: 4, name: "Sports Equipment" },
              { id: 5, name: "Food Products" }
            ]
          }
        };
        setCategories(response.data.Categories);
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

  const handleCategoryChange = (id) => {
    setProductData(prevData => ({
      ...prevData,
      categoryId: id // Update to handle single category selection
    }));
    setShowCategories(false); // Hide categories dropdown after selection
  };

  const handleFileChange = (e) => {
    setProductData(prevData => ({
      ...prevData,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when submitting form

    // Upload image
    if (productData.image) {
      const formData = new FormData();
      formData.append('image', productData.image);

      axios.post('/upload/image/', formData, {
        onUploadProgress: progressEvent => {
          setUploadProgress(Math.round((progressEvent.loaded / progressEvent.total) * 100));
        }
      })
      .then(response => {
        const imagePath = response.data.path;
        // Submit product data
        return axios.post('/product/', {
          ...productData,
          image: imagePath
        });
      })
      .then(response => {
        setMessage('Product added successfully!');
        setProductData({
          name: '',
          description: '',
          price: '',
          priceUnit: 'inr',
          categoryId: '',
          image: null
        });
        setLoading(false);
      })
      .catch(error => {
        setMessage(`Error: ${error.message}`);
        setLoading(false);
      });
    } else {
      // Submit product data without image
      axios.post('/product/', productData)
        .then(response => {
          setMessage('Product added successfully!');
          setProductData({
            name: '',
            description: '',
            price: '',
            priceUnit: 'inr',
            categoryId: '',
            image: null
          });
          setLoading(false);
        })
        .catch(error => {
          setMessage(`Error: ${error.message}`);
          setLoading(false);
        });
    }
  };

  return (
    <Container className="dashboard-container">
      {loading ? (
        <Spinner /> // Show spinner while loading
      ) : (
        <Row>
          <Col md={8} lg={6} className="mx-auto">
            <h2 className="dashboard-title">Traceflow</h2>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit} className="dashboard-form">
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                  className="dashboard-input"
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={productData.description}
                  onChange={handleInputChange}
                  required
                  className="dashboard-input"
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  required
                  className="dashboard-input"
                />
              </Form.Group>
              <Form.Group controlId="formPriceUnit">
                <Form.Label>Price Unit</Form.Label>
                <Form.Control
                  as="select"
                  name="priceUnit"
                  value={productData.priceUnit}
                  onChange={handleInputChange}
                  className="dashboard-select"
                >
                  <option value="inr">INR</option>
                  <option value="usd">USD</option>
                  {/* Add more price units if needed */}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formProductCategories">
                <Form.Label>Categories</Form.Label>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={() => setShowCategories(!showCategories)}>
                    {productData.categoryId ? categories.find(cat => cat.id === parseInt(productData.categoryId)).name : "Select a category"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu show={showCategories}>
                    {categories.map(category => (
                      <Dropdown.Item key={category.id} onClick={() => handleCategoryChange(category.id)}>
                        {category.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
              <Form.Group controlId="formProductImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                  className="dashboard-file"
                />
                {uploadProgress > 0 && <div>Uploading: {uploadProgress}%</div>}
              </Form.Group>
              <Button variant="primary" type="submit" className="dashboard-button">
                Add Product
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default SellerDashboard;
