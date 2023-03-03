const Sequelize = require('sequelize')
const connection = require('./database')
const Question = require('./Question')

const Answer = connection.define('answers', {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Answer.belongsTo(Question)

Answer.sync({force: false}).then(() => {})


module.exports = Answer