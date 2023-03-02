const User = require('../database/User')
const bcrypt = require('bcrypt')

class Users {

    async new(name, email, username, password) {
        try {
            const hash = await bcrypt.hash(password, 10)
            await User.create({
                name: name,
                email: email,
                username: username,
                password: hash
            })
        } catch(err) {
            console.log(err)
        }
    }

    async findByUsername(username) {
        try {
            const result = await User.findOne({where: {username: username}}) 
            return result
        } catch(err) {
            console.log(err)
        }

    }

}

module.exports = new Users()