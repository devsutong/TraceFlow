const DataTypes = require('sequelize');
const productPriceUnits = require("../../config")
const CategoryModel = require('./Category');

const sequelize = require('./SequelizeInstance');

// const Category = CategoryModel.initialise(sequelize);

const ProductModel = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    priceUnit: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: productPriceUnits.DOLLAR,
    },
  });

module.exports = {
  // initialise: (sequelize) => {
  //   const Product = sequelize.define('Product', ProductModel);
  //   // const Category = sequelize.define('Category', CategoryModel);

  //   Product.belongsToMany(Category, { through: 'ProductCategory' });
  //   Category.belongsToMany(Product, { through: 'ProductCategory' });

  //   this.Product = Product;
  //   this.Category = Category;
  // },
  createProduct: (product) => {
    return this.Product.create(product);
  },
  findProduct: (query) => {
      return this.Product.findOne({ where: query });
  },
  updateProduct: (query, updatedValues) => {
      return this.Product.update(updatedValues, { where: query });
  },
  findAllProducts: (query) => {
      return this.Product.findAll({ where: query });
  },
  deleteProduct: (query) => {
      return this.Product.destroy({ where: query });
  },
  Product: ProductModel
};  