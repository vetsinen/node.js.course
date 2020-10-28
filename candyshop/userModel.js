connection = require('./connection')
const { Sequelize, DataTypes } = require('sequelize');

const userModel = connection.define('user', {
    login: {type: DataTypes.STRING},
    md5hash: {type: DataTypes.STRING},
    budget: {type: DataTypes.FLOAT},
    isAdmin: {type: DataTypes.BOOLEAN}
})

module.exports = userModel