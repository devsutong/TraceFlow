const { OrderItem } = require("../../common/models/Order");

module.exports = {
    type: "object",
    properties: {
        userID: {
            type: "number",
        },
        totalAmount: {
            type: "number",
        },
        status: {
            type: "string",
            enum: ["Pending", "Delivered", "Cancelled"],
        },
        orderItem: {
            type: "array",
            items: OrderItem,
        },
        createdAt: {
            type: "string",
            format: "date-time",
        },
        updatedAt: {
            type: "string",
            format: "date-time",
        },
    },
} 