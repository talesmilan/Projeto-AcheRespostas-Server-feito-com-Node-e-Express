const Messages = require('../models/Messages')
const validator = require('validator')

class MessageController {

    async newMessage(req, res) {
        const {name, email, reason, message} = req.body
        if(name === "" || name === undefined || email === "" || email === undefined || reason === "" || reason === undefined || message === "" || message === undefined) {
            res.status(400)
            res.json({err: "Todos os campos devem ser preenchidos."})
        }
        if(name !== "" && (name.length < 3 || name.length > 50)) {
            res.status(400)
            res.json({err: "O nome deve ter entre 3 a 50 caracteres."})
        }
        const emailIsValid = validator.isEmail(email)
        if (email !== "" && (!emailIsValid)) {
            res.status(400)
            res.json({err: "O email não é válido."})
        }
        await Messages.new(name, email, reason, message)
        res.status(200)
        res.json({success: "A sua mensagem foi enviada com sucesso."})
    }


}

module.exports = new MessageController()