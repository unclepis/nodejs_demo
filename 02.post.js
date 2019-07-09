const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        console.log('Content-type:', req.headers['content-type']);
        // 接受数据
        let postData = ""
        req.on('data', chunk => {
            postData += chunk.toString();
        })
        req.on('end', () => {
            console.log(postData)
            res.end('hello world');
        })
    }
})

server.listen(3000, () => {
    console.log('server is listening on 3000 port')
})