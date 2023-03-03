const Messages = require('../models/Messages')
const validator = require('validator')

class MessageController {

    async newMessage(req, res) {
        const {name, email, reason, message} = req.body
        var error400 = ""
        if(name === "" || name === undefined || email === "" || email === undefined || reason === "" || reason === undefined || message === "" || message === undefined) {
            error400 = "Todos os campos devem ser preenchidos."
        }
        if(name !== "" && (name.length < 3 || name.length > 50)) {
            error400 = "O nome deve ter entre 3 a 50 caracteres."
        }
        const emailIsValid = validator.isEmail(email)
        if (email !== "" && (!emailIsValid)) {
            error400 = "O email não é válido."
        }
        if(error400 === "") {
            await Messages.new(name, email, reason, message)
            res.status(200)
            res.json({success: "A sua mensagem foi enviada com sucesso."})
        } else {
            res.status(400)
            res.json({err: error400})
        }
    }


}

module.exports = new MessageController()