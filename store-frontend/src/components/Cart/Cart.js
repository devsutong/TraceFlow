// src/components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../Cart/CartContext'; // Adjust the import path if needed
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBRow, MDBTypography, MDBInput } from 'mdb-react-ui-kit';
import './styles/Cart.css'; // Ensure the path is correct

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItem, loading, error } = useContext(CartContext);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (loading) return <p>Loading cart items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MDBContainer className="py-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="8">
          <MDBCard>
            <MDBCardBody>
              <MDBTypography tag="h2" className="text-center mb-4">
                Shopping Cart
              </MDBTypography>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <MDBRow key={item.id} className="mb-4 align-items-center">
                      <MDBCol md="3">
                        <MDBCardImage src={item.image} fluid className="rounded-3" alt={item.name} />
                      </MDBCol>
                      <MDBCol md="5">
                        <MDBTypography tag="h5" className="mb-2">
                          {item.name}
                        </MDBTypography>
                        <MDBTypography tag="h6" className="text-muted">
                          ${item.price.toFixed(2)}
                        </MDBTypography>
                      </MDBCol>
                      <MDBCol md="2">
                        <MDBInput
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                        />
                      </MDBCol>
                      <MDBCol md="2" className="text-end">
                        <MDBBtn color="danger" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  ))}
                  <MDBRow className="mt-4">
                    <MDBCol md="8">
                      <MDBTypography tag="h4" className="text-end">
                        Total: ${calculateTotalPrice()}
                      </MDBTypography>
                    </MDBCol>
                    <MDBCol md="4" className="text-end">
                      <MDBBtn color="dark" size="lg">
                        Checkout
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </>
              ) : (
                <MDBTypography tag="h5" className="text-center">
                  Your cart is empty.
                </MDBTypography>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Cart;
