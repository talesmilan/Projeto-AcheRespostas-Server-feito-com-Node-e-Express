const bodyParser = require('body-parser')
const express = require("express")
const app = express()
const router = require('./routes/routes')
const cors = require('cors')
const connection = require('./database/database')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use("/",router)

connection.authenticate()
    .then(() => {
    console.log("Conexão feita com sucesso!")
    })
    .catch((e) => console.log(e))

app.listen(5000,() => {
    console.log("Servidor rodando!")
})