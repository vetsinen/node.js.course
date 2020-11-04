const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './candyshop.sqlite'
})
sequelize.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Error: ', err))

module.exports = sequelize
