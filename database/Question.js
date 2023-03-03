const Sequelize = require('sequelize')
const connection = require('./database')

const Question = connection.define('questions', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    topics: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Question.sync({force: false}).then(() => {})

module.exports = Question