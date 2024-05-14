import { DataTypes } from 'sequelize';
import { productPriceUnits } from '../../config';

const ProductModel = {
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
  };

    module.exports = {
        initialise: (sequelize) => {
        this.model = sequelize.define('product', ProductModel);
        },
        createProduct: (product) => {
            return this.model.create(product);
        },
        findProduct: (query) => {
            return this.model.findOne({
                where: query,
            });
        },
        updateProduct: (query, updatedValues) => {
            return this.model.update(updatedValues, {
                where: query,
            });
        },
        findAllProducts: (query) => {
            return this.model.findAll({
                where: query,
            });
        },
        deleteProduct: (query) => {
            return this.model.destroy({
              where: query
            });
        }
    };  