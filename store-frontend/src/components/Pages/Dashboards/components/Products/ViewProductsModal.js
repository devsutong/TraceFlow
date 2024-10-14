import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const ViewProductsModal = ({ show, onHide, products, onProductSelect, onProductDelete }) => {
  const handleUpdateClick = (product) => {
    onProductSelect(product); // Pass the selected product to the parent component
  };

  const handleDeleteClick = (product) => {
    onProductDelete(product); // Trigger delete action in the parent component
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>View Products</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {products.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>
                    {product.price} {product.priceUnit.toUpperCase()} {/* Convert to uppercase */}
                  </td>
                  <td>
                    <Button 
                      variant="warning" 
                      onClick={() => handleUpdateClick(product)} 
          
                    >
                      <FontAwesomeIcon icon={faEdit}/>
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDeleteClick(product)} 
                      
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>No products found</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProductsModal;
