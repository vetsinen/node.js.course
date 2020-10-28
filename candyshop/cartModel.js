connection = require('./connection')
const { Sequelize, DataTypes } = require('sequelize');

const orderModel = connection.define('order', {
    isPending: {type: DataTypes.BOOLEAN}
})

const orderItemModel = connection.define('orderItem', {
    refOrder: {type: DataTypes.INTEGER},
    refProduct: {type: DataTypes.INTEGER}
})

module.exports = {orderModel}