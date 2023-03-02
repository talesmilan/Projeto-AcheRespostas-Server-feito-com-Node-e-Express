const Sequelize = require('sequelize')
const connection = require('./database')

const Message = connection.define('messages', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    reason: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Message.sync({force: false}).then(() => {})

module.exports = Message