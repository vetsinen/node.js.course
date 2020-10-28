connection = require('./connection')
const { Sequelize, DataTypes } = require('sequelize');

const userModel = connection.define('product', {
    fullname: {type: DataTypes.STRING},
    budget: {type: DataTypes.FLOAT},
    isAdmin: {type: DataTypes.BOOLEAN}
})

module.exports = userModel