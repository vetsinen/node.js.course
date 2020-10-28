// var sqlite3 = require('sqlite3').verbose()
// var db = new sqlite3.Database('./candyshop.sqlite')

const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './candyshop.sqlite'
})
sequelize.authenticate()
    .then(() => console.log('Database Connected'))
    .catch(err => console.log('Error: ', err))

module.exports = sequelize

// User.sync({force: true}).then(function () {
//     // Table created
//     User.create({
//         firstName: 'John',
//         lastName: 'Hancock'
//     });
//     console.log('trying to find')
//     User.findOne().then(function (user) {
//         console.log(user.get('firstName'));
//     });
// });

