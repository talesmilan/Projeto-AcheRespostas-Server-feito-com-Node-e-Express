const Question = require('../database/Question')

class Questions {

    async displayQuestions(page) {
        try {
            var offset = 0
            if (isNaN(page) || page == 1) {
                offset = 0
            } else {
                offset = (parseInt(page) - 1) * 5
            }
            const questions = await Question.findAndCountAll({
                limit: 5,
                offset: offset,
                order: [
                    ['id', 'DESC']
                ]
            })
            return questions
        } catch(err) {
            console.log(err)
            return null
        }
    }

    async newQuestion(title, topics, body, username) {
        try {
            await Question.create({
                title: title,
                topics: topics,
                body: body,
                username: username
            })
        } catch(err) {
            console.log(err)
        }
    }

    async findById(id) {
        try {
            const question = Question.findOne({where: {id: id}})
            return question
        } catch(err) {
            console.log(err)
            return null
        }
    }


}

module.exports = new Questions()