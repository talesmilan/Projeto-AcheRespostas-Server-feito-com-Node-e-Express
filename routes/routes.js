const express = require('express')
const app = express()
const router = express.Router()
const authToken = require('../middlewares/authToken')

const UserController = require('../controllers/UserController')
const MessageController = require('../controllers/MessageController')
const QuestionController = require('../controllers/QuestionController')

router.post('/register', UserController.register)
router.post('/message', MessageController.newMessage)
router.post('/login', UserController.login)
router.get("/authorization", authToken, UserController.authorization)
router.post("/questions", authToken, QuestionController.toAsk)
router.get("/questions", QuestionController.index)
router.get("/question/:id", QuestionController.findQuestion)
module.exports = router