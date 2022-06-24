const http = require('http')
const app = require('./config/express.config')
const port = 3000

server = http.createServer(app)
server.listen(port,
  () => console.log(`server started on port ${port}`))
