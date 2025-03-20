const { DataTypes } = require('sequelize');
const sequelize = require('./SequelizeInstance');

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

module.exports = {
    Cart: Cart,
    CartItem: CartItem
};