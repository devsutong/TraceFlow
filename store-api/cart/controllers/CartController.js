// controllers/cartController.js
const { Cart, CartItem, Product } = require('../../common/models/associations');

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
    const { userId } = req.body;

    try {
        const cart = await Cart.findOne({
            where: { userId },
            include: [
                {
                    model: CartItem,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price'],
                        },
                    ],
                },
            ],
        });

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
