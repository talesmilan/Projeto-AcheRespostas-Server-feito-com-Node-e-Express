const express = require('express')
const app = express()
const router = express.Router()
const authToken = require('../middlewares/authToken')

const UserController = require('../controllers/UserController')
const MessageController = require('../controllers/MessageController')

router.post('/register', UserController.register)
router.post('/message', MessageController.newMessage)
router.post('/login', UserController.login)
router.get("/authorization", authToken, UserController.authorization)
module.exports = router