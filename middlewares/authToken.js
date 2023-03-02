const secret = require('../shared/secretJWT')
const jwt = require('jsonwebtoken')

function auth(req, res, next) {
    const authToken = req.headers['authorization']

    if(authToken !== undefined) {

        const bearer = authToken.split(' ')
        var token = bearer[1]
        if(token === "") {
            res.status(401)
            res.json({err: "Token inválido."})
        }
        jwt.verify(token, secret, (err, data) => {
            if(err) {
                res.status(401)
                res.json({err: "Token inválido."})
            } else {
                req.token = token
                next()
                return
            }
        })

    } else {
        res.status(401)
        res.json({err: "Token inválido."})
    }
}

module.exports = auth
