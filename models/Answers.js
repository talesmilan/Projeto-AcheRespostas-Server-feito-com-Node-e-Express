const Answer = require('../database/Answer')

class Answers {

    async new(username, body, questionId) {
        try {
            const answers = await Answer.create({
                username: username,
                body: body,
                questionId: questionId
            })
            return answers
        } catch(err) {
            console.log(err)
        }
    }

    async findByQuestionId(questionId) {
        try {
            const answers = await Answer.findAll({where: {questionId: questionId}})
            return answers
        } catch(err) {
            console.log(err)
            return null
        }
    }

}

module.exports = new Answers()