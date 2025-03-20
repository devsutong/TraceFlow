const {User} = require('./User');
const {Order} = require('./Order');
const {OrderItem} = require("./Order")
const {Product} = require('./Product');
const {Category} = require("./Category")
const {Cart} = require("./Cart")
const {CartItem} = require("./Cart")
const { Address } = require("./Address");

const sequelize = require("sequelize")
console.log("User: ", User) // Should show the User model definition
console.log("Order: ", Order); // Should show the Order model definition
console.log("Product: ", Product); // Should show the Product model definition
console.log("OrderItem: ", OrderItem); // Should show the OrderItem model definition
console.log("Address: ", Address)

console.log(User instanceof sequelize.Model); // Should be true
console.log(Order instanceof sequelize.Model); // Should be true
console.log(Product instanceof sequelize.Model); // Should be true
console.log(OrderItem instanceof sequelize.Model); // Should be true
console.log(Address instanceof sequelize.Model); // Should be true

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
User.hasOne(Cart, { foreignKey: 'userID' });
Cart.belongsTo(User, { foreignKey: 'userId' });//sequelize Instance issue

Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

Product.hasMany(CartItem, { foreignKey: 'productID' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// Address Relationships
User.hasMany(Address, { foreignKey: 'userID' }); // A user can have multiple addresses
Address.belongsTo(User, { foreignKey: 'userID' }); // Each address belongs to one user

// Address - Order Relationship
Order.belongsTo(Address, { foreignKey: 'addressID' }); // An order is linked to one address
Address.hasMany(Order, { foreignKey: 'addressID' }); // An address can have multiple orders

module.exports = { User, Order, Product, OrderItem, Cart, CartItem, Address };
