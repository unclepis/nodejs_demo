const http = require('http')

const PORT = 8000

// const serverHandler = require('./serverHandler')
const { serverHandler } = require('./serverHandler')

const server = http.createServer(serverHandler)

server.listen(PORT);