const {User} = require('./User');
const {Order} = require('./Order');
const {OrderItem} = require("./Order")
const {Product} = require('./Product');
const {Category} = require("./Category")
const {Cart, CartItem} = require("./Cart")


const sequelize = require("sequelize")
console.log("User: ", User) // Should show the User model definition
console.log("Order: ", Order); // Should show the Order model definition
console.log("Product: ", Product); // Should show the Product model definition
console.log("OrderItem: ", OrderItem); // Should show the OrderItem model definition

console.log(User instanceof sequelize.Model); // Should be true
console.log(Order instanceof sequelize.Model); // Should be true
console.log(Product instanceof sequelize.Model); // Should be true
console.log(OrderItem instanceof sequelize.Model); // Should be true

// User - Order: One-to-Many relationship
User.hasMany(Order, { foreignKey: 'userID' });
Order.belongsTo(User, { foreignKey: 'userID' });

// Order - Product: Many-to-Many relationship through OrderItem
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'orderID' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'productID' });

Order.hasMany(OrderItem, { foreignKey: 'orderID' });
OrderItem.belongsTo(Order, { foreignKey: 'orderID' });

Product.hasMany(OrderItem, { foreignKey: 'productID' });
OrderItem.belongsTo(Product, { foreignKey: 'productID' });

// Product - Categories Relationship
Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });


//CART
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = { User, Order, Product, OrderItem, Cart, CartItem};
