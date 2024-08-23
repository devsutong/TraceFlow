const express = require('express');
const router = express.Router();
const cartController = require('./controllers/CartController');

// Route to add a product to the cart
router.post('/add', cartController.addToCart);

// Route to update a cart item
router.put('/update', cartController.updateCartItem);

// Route to remove a product from the cart
router.delete('/remove', cartController.removeFromCart);

// Route to view the cart
router.get('/', cartController.viewCart);

module.exports = router;
