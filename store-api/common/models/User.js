const { DataTypes } = require("sequelize")
const { roles } = require("../../config")

const UserModel = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: roles.USER
    } 
};

module.exports = {
    initialise: (sequelize) => {
        this.model = sequelize.define("user", UserModel);
    },
    
    createUser: (user) => {
        return this.model.create(user);
    }, 
    findUser: (query) => {
        return this.model.findOne({
            where: query,
        });
    },
    updateUser: (query, updatedValues) => {
        return this.model.update(updatedValues, {
            where: query
        });
    },
    findAllUsers: (query) => {
        return this.model.findAll({
            where: query
        });
    },
    deleteUser: (query) => {
        return this.model.destroy({
            where: query
        });
    }
};