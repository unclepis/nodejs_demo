const http = require('http')
const queryString = require('querystring')

const server = http.createServer((request, response) => {
    const method = request.method
    // console.log('Methods:', method)
    const url = request.url
    // console.log('url:', url)
    const path = url.split('?')[0]
    // console.log('path:', path)
    const query = queryString.parse(url.split('?')[1])
    // console.log('query:', query)
    // 设置响应格式
    response.setHeader('Content-type', 'application/json');
    let res = {
        method,
        url,
        path,
        query,
        success:true,
        msg:'success',
        data:null
    }
    let postData = ""
    if (method === 'GET') {
        response.end(JSON.stringify(res))
    }
    if (method === 'POST') {
        request.on('data', chunk => {
            postData += chunk.toString();
        })

        request.on('end', () => {
            res.data = postData;
            response.end(JSON.stringify(res))
        })
    }

})

server.listen(3000)
console.log('ok')