sequelize = require('./connection')
const { Sequelize, DataTypes } = require('sequelize');

const product = sequelize.define('product', {
    title: {type: DataTypes.STRING},
    isPending: {type: DataTypes.BOOLEAN}
})

module.exports = product