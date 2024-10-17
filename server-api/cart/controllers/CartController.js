// controllers/cartController.js
const { Cart, CartItem, Product } = require('../../common/models/associations');
const jwtSecret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
        // Find or create a cart for the user
        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId });
        }

        // Check if the product already exists in the cart
        let cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId } });
        if (cartItem) {
            // Update the quantity if the product already exists
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            // Create a new cart item if the product doesn't exist
            cartItem = await CartItem.create({ cartId: cart.id, productId, quantity });
        }

        return res.status(200).json({
            status: true,
            message: 'Product added to cart',
            data: cartItem,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'An error occurred while adding to cart',
            error: error.message,
        });
    }
};

exports.removeFromCart = async (req, res) => {
    const { cartItemId } = req.body;
    try {
        const cartItem = await CartItem.findByPk(cartItemId);

        if (!cartItem) {
            return res.status(404).json({
                status: false,
                message: 'Cart item not found',
            });
        }

        await cartItem.destroy();

        return res.status(200).json({
            status: true,
            message: 'Cart item removed',
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'An error occurred while removing cart item',
            error: error.message,
        });
    }
};


exports.updateCartItem = async (req, res) => {
    const { cartItemId, quantity } = req.body;

    try {
        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) {
            return res.status(404).json({
                status: false,
                message: 'Cart item not found',
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json({
            status: true,
            message: 'Cart item updated',
            data: cartItem,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'An error occurred while updating cart item',
            error: error.message,
        });
    }
};


exports.viewCart = async (req, res) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);  
    // var userId = decoded.userId
    // console.log(userId)

    const { userId } = decoded;
    console.log(userId)

    try {
        const cart = await Cart.findOne({
            where: { userId },
            attributes: ['id', 'userId', 'createdAt', 'updatedAt'],
            include: [
                {
                    model: CartItem,
                    attributes: ['id', 'cartId', 'productId', 'quantity', 'createdAt', 'updatedAt'],
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
            ],
        });
        console.log("TEST-----------")

        if (!cart) {
            return res.status(404).json({
                status: false,
                message: 'Cart not found',
            });
        }

        return res.status(200).json({
            status: true,
            data: cart,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: 'An error occurred while fetching the cart',
            error: error.message,
        });
    }
};
