const express = require('express');
const router = express.Router();
const cartController = require('./controllers/CartController');

// Route to add a product to the cart
router.post('/cart/add', cartController.addToCart);

// Route to update a cart item
router.put('/cart/update', cartController.updateCartItem);

// Route to remove a product from the cart
router.delete('/cart/remove', cartController.removeFromCart);

// Route to view the cart
router.get('/cart', cartController.viewCart);

module.exports = router;
