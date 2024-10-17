const { User, Order, Product, OrderItem } = require('../../common/models/associations');


module.exports = {
    // createOrderItem: async (req, res) => {
    //     const { productID, quantity, price, orderID } = req.body;
    //     try {
    //         const orderItem = await createOrderItem({ productID, quantity, price, orderID });
    //         return res.status(201).json({
    //             status: true,
    //             data: orderItem.toJSON()
    //         });
    //     } catch (error) {
    //         return res.status(400).json({
    //             status: false,
    //             error: error.message
    //         });
    //     }
    // },

    createOrder: async (req, res) => {
        try {
            console.log("Creating Order!")
            const {userID, products, totalAmount, status} = req.body;
            const order = await Order.create({userID, totalAmount, status});
            console.log("Order Created!")
            console.log(products)
            const orderID = order.id;
            console.log(orderID)

            const orderItems = await Promise.all(products.map(async product => {
                const { productID, quantity } = product;
                console.log(productID);
                return OrderItem.create({ orderID, productID, quantity });
            }));

            return res.status(201).json({
                message: "Order created successfully",
                order: order,
                orderItems: orderItems
            })
        } catch(error) {
            return res.status(400).json({
                message: "An errored occured while creating an order",
                errorMessage: error
            })
        }
    },

    getOrders: async (req, res) => {
        console.log("Get Orders");
        const { userID } = req.body;
        console.log(userID)
        try {
            const orders = await Order.findAll({
                userID,
                include: [
                    {
                        model: OrderItem,
                        include: [{
                            model: Product,
                            attributes: ['id', 'name', 'image', 'price']
                        }],
                        attributes: ['quantity']
                    },
                ]}
            );
            console.log(orders)
            return res.status(200).json({
                status: true,
                data: orders.map((order) => order.toJSON())
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },

    getOrder: async (req, res) => {
        const { id } = req.params;
        try {
            const order = await findOrder({ id });
            if (!order) {
                return res.status(404).json({
                    status: false,
                    error: "Order not found!"
                });
            }
            return res.status(200).json({
                status: true,    
                data: order.toJSON()
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },

    updateOrder: async (req, res) => {
        const { id } = req.params;
        const updatedValues = req.body;
        console.log(updatedValues)
        try {
            const order = await Order.findOne({ id });
            if (!order) {
                return res.status(404).json({
                    status: false,
                    error: "Order not found!"
                });
            }
            await Order.update(updatedValues, {where: {id}});
            const updatedOrder = await Order.findOne({ id });
            return res.status(200).json({
                status: true,
                data: updatedOrder.toJSON
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    },
    
    deleteOrder: async (req, res) => {
        console.log("Deleteing Order")
        const { id } = req.params;
        console.log("ID: ", id)
        try {
            const order = await Order.findOne({ id });
            if (!order) {
                return res.status(404).json({
                    status: false,
                    error: "Order not found!"
                });
            }
            await order.destroy();
            return res.status(200).json({
                status: true,
                message: "Order deleted successfully!"
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    }
};