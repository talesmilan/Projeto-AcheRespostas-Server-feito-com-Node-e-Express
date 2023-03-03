const secret = require('../shared/secretJWT')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken !== undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]
        if(token === "") {
            res.status(401)
            res.json({err: "Você precisa estar logado para fazer esta operação."})
        }
        jwt.verify(token, secret, (err, data) => {
            if(err) {
                res.status(401)
                res.json({err: "Você precisa estar logado para fazer esta operação."})
            } else {
                req.token = token
                req.username = data.username
                next()
                return
            }
        })

    } else {
        res.status(401)
        res.json({err: "Você precisa estar logado para fazer esta operação."})
    }
}

module.exports = auth
