// src/components/Order/Order.js
import React, { useContext } from 'react';
import { CartContext } from '../../Cart/CartContext';
import axios from 'axios';
import { MDBBtn, MDBTypography, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody , MDBCardImage } from 'mdb-react-ui-kit';
import {jwtDecode} from 'jwt-decode';
import '../styles/Order.css';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { cartItems } = useContext(CartContext);
  const navigate=useNavigate();
  const handleSubmitOrder = async () => {
    const token = sessionStorage.getItem("authToken");
    const userId = jwtDecode(token).userId;

    const orderData = {
      userID: userId,
      products: cartItems.map(item => ({
        productID: item.Product.id,
        quantity: item.quantity,
      })),
      totalAmount: cartItems.reduce((total, item) => total + (item.Product.price * item.quantity), 0),
      status: 'Pending',
    };

    try {
      const response = await axios.post('/orders/create', orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      // Optionally clear the cart or redirect the user
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    }
  };

  if (cartItems.length === 0) {
    return <h2 className="text-center">Your cart is empty. Please add items to place an order.</h2>;
  }

  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard className="shadow-5">
            <MDBCardBody>
              <MDBTypography tag="h1" className="mb-4 text-center">Order Summary</MDBTypography>
              <ul className="list-unstyled">
                {cartItems.map((item) => (
                  <MDBRow key={item.id} className="align-items-center">
                    <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage src={item.Product.image} fluid className="rounded-3 small-image my-2" alt={item.Product.name} />
                          </MDBCol>
                    <MDBCol>
                      <MDBTypography tag="h6" className="mb-0">{item.Product.name}</MDBTypography>
                    </MDBCol>
                    <MDBCol className="text-end">
                      <MDBTypography tag="h6" className="mb-0">Quantity: {item.quantity}</MDBTypography>
                    </MDBCol>
                    <MDBCol className="text-end">
                      <MDBTypography tag="h6" className="mb-0">INR {item.Product.price.toFixed(2)}</MDBTypography>
                    </MDBCol>
                  </MDBRow>
                ))}
              </ul>
              <hr />
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBTypography tag="h5">
                    Total Amount: <strong>INR {cartItems.reduce((total, item) => total + (item.Product.price * item.quantity), 0).toFixed(2)}</strong>
                  </MDBTypography>
                </MDBCol>
              </MDBRow>
              <MDBBtn color="dark" onClick={handleSubmitOrder} className="mt-4 w-100">Submit Order</MDBBtn>
              <MDBBtn color="dark" onClick={()=>{navigate('/cart')}} className="mt-4 w-100">Back To Cart</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Order;
