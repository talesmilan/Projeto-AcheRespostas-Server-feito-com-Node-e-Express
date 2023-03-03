const Answers = require('../models/Answers')
const Questions = require('../models/Questions')


class AnswerController {

    async newAnswer(req, res) {
        const {body, questionId} = req.body
        const username = req.username
        if(body === "" || body == undefined || questionId === "" || questionId == undefined) {
            res.status(400)
            res.json({err: "Todos os campos devem ser preenchidos."})
        } else {
            const answer = await Answers.new(username, body, questionId)
            res.status(200)
            res.json(answer)
        }
    }

    async findAnswers(req, res) {
        const questionId = req.params.id
        if(questionId == undefined || isNaN(questionId)) {
            res.status(400)
            res.json({err: "O número do ID não é válido."})
        } else {
            const answers = await Answers.findByQuestionId(questionId)
            if(answers == undefined) {
                res.status(404)
                res.json({err: "Nenhuma resposta foi encontrada."})
            } else {
                res.status(200)
                res.json(answers)
            }
        }
    }

}

module.exports = new AnswerController()