const expressConfig = require('express')
const bodyParser = require('body-parser')
const routes = require('../routes')
const cors = require('cors')
const app = expressConfig()

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(routes)

module.exports = app
