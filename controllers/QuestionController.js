const Questions = require('../models/Questions')


class QuestionController {


    async toAsk(req, res) {
        const {title, body, topics} = req.body
        const username = req.username
        if(title === "" || title == undefined || body === "" || body == undefined || topics === "" || topics == undefined) {
            res.status(400)
            res.json({err: "Você deve preencher todos os campos."})
        } else {
            await Questions.newQuestion(title, topics, body, username)
            res.status(200)
            res.json({success: "A sua pergunta foi enviada com sucesso."})
        }
    }

    async index(req, res) {
        var page = req.query.page
        if(page == undefined) {
            page = 1
        }
        const questions = await Questions.displayQuestions(page)
        if(questions != undefined) {
            res.status(200)
            res.json(questions)
        } else {
            res.status(404)
            res.json({err: "Dados não disponíveis."})
        }
    }

    async findQuestion(req, res) {
        const id = req.params.id
        if(id == undefined || isNaN(id)) {
            res.status(400)
            res.json({err: "O número de ID não foi enviado ou é inválido."})
        } else {
            const question = await Questions.findById(id)
            if(question == undefined) {
                res.status(404)
                res.json({err: "A questão buscada não existe."})
            } else {
                res.status(200)
                res.json(question)
            }
        }
    }


}

module.exports = new QuestionController()