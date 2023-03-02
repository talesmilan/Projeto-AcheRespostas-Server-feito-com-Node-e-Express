const Users = require('../models/Users')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../shared/secretJWT')

class UserController {

    async register(req, res) {

        const {name, username, password, email, checkPassword} = req.body

        if(name === "" || name === undefined || username === "" || username === undefined || password === "" || password === undefined || email === "" || email === undefined) {
            res.status(400)
            res.json({err: "Você deve preencher todos os campos."})
        }
        if(name !== "" && (name.length < 3 || name.length > 50)) {
            res.status(400)
            res.json({err: "O nome deve ter entre 3 a 50 caracteres."})
        }
        if(username !== "" && (username.length < 3 || username.length > 30)) {
            res.status(400)
            res.json({err: "O nome de usuário deve ter entre 3 a 30 caracteres."})
        }
        if(password !== "" && (password.length < 6 || password.length > 50)) {
            res.status(400)
            res.json({err: "A senha deve ter entre 6 a 50 digítos."})
        }
        if(password !== "" && password !== checkPassword) {
            res.status(400)
            res.json({err: "Você digitou uma senha diferente no campo de confirmar senha."})
        }
        const emailIsValid = validator.isEmail(email)
        if (email !== "" && (!emailIsValid)) {
            res.status(400)
            res.json({err: "O email não é válido."})
        }
        await Users.new(name, email, username, password)
        res.status(200)
        res.json({success: "O seu cadastro foi realizado com sucesso!"})
    }

    async login(req, res) {
        const {username, password, remember} = req.body
        if(username === "" || username === undefined || password === "" || password === undefined) {
            res.status(400)
            res.json({err: "Você deve preencher todos os campos."})
        }

        const user = await Users.findByUsername(username)
        if(user == undefined) {
            res.status(404)
            res.json({err: "Usuário ou senha incorretos."})
        } else {
            const correct = bcrypt.compareSync(password, user.password)
            if (correct) {
                jwt.sign({username: username}, secret, {expiresIn: remember ? "1h" : "168h"}, (err, token) => {
                    if(err) {
                        res.status(400)
                        res.json({err: "Falha interna."})
                    } else {
                        res.status(200)
                        res.json({token: token})
                    }
                })
            } else {
                res.status(401)
                res.json({err: "Usuário ou senha incorretos."})
            }
        }
    }

    async authorization(req, res) {
        res.status(200)
        res.json({success: "Você já está logado."})
    }


}

module.exports = new UserController()