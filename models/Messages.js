const Message = require('../database/Message')


class Messages {

    async new(name, email, reason, message) {
        try {
            await Message.create({
                name: name,
                email: email,
                reason: reason,
                message: message
            })
        } catch(err) {
            console.log(err)
        }

    }

}

module.exports = new Messages()