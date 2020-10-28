connection = require('./connection')
const { Sequelize, DataTypes } = require('sequelize');

const product = connection.define('product', {
    title: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT}
})

module.exports = product