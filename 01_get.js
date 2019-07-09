const http = require('http')
const queryString = require('querystring')

const server = http.createServer((req, res) => {
    const method = req.method
    console.log('Methods:', method)
    const url = req.url
    console.log('url:', url)
    const query = queryString.parse(url.split('?')[1])
    console.log('query:', query)
    res.end(JSON.stringify(req.query))
})

server.listen(3000)
console.log('ok')