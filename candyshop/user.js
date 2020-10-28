sequelize = require('./storage')

var User = sequelize.define('user', {
    fullName: {
        type: Sequelize.STRING
    },
    isAdmin: {
        type: Sequelize.BOOLEAN
    },
    budget: {
        type: Sequelize.BIGINT
    }
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});