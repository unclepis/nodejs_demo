const http = require('http')

const PORT = 8000


const server = http.createServer((req, response) => {
    if (req.url === '/err') {
       throw new Error('大哥我错了')
    }
    // 设置返回格式为json
    response.setHeader('Content-type', "application/json")
    response.write("Hello world11 \n")
    response.end()
})

server.listen(PORT);
console.log('server is running on', PORT)
console.error('MOCK ERROR')