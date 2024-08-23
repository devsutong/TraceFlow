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
        return CategoryModel.create(category);
    },
    findCategory: (query) => {
        return CategoryModel.findOne({ where: query });
    },
    updateCategory: (query, updatedValues) => {
        return CategoryModel.update(updatedValues, { where: query });
    },
    findAllCategories: (query) => {
        return CategoryModel.findAll({ where: query });
    },
    deleteCategory: (query) => {
        return CategoryModel.destroy({ where: query });
    },
    Category: CategoryModel
}