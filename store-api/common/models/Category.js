const DataTypes = require('sequelize');

const CategoryModel = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

module.exports = {
    initialise: (sequelize) => {
        const Category = sequelize.define('Category', CategoryModel);
        this.Category = Category;
        return Category;
    },
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
}