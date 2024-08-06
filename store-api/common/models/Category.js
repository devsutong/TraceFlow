const DataTypes = require('sequelize');
const sequelize = require('./SequelizeInstance');

const CategoryModel = sequelize.define("Category", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = {

    createCategory: (category) => {
        return this.Category.create(category);
    },
    findCategory: (query) => {
        return this.Category.findOne({ where: query });
    },
    updateCategory: (query, updatedValues) => {
        return this.Category.update(updatedValues, { where: query });
    },
    findAllCategories: (query) => {
        return this.Category.findAll({ where: query });
    },
    deleteCategory: (query) => {
        return this.Category.destroy({ where: query });
    },
    Category: CategoryModel
}