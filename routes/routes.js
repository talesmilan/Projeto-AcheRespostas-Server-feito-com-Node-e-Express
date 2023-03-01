const express = require('express')
const app = express()
const router = express.Router()

const UserController = require('../controllers/UserController')

router.post('/register', UserController.register)


module.exports = router