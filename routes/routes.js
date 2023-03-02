const express = require('express')
const app = express()
const router = express.Router()

const UserController = require('../controllers/UserController')
const MessageController = require('../controllers/MessageController')

router.post('/register', UserController.register)
router.post('/message', MessageController.newMessage)


module.exports = router