const handleBlogRouter = require('../src/router/blog')
const handleUserRouter = require('../src/router/user')
const querystring = require('querystring')

const serverHandler = (req, response) => {
    // 设置返回格式为json
    response.setHeader('Content-type', "application/json");
    // 获取path
    const url = req.url
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);
    // 处理blog路由
    const blogData = handleBlogRouter(req, response)
    const userData = handleUserRouter(req, response)
    if (blogData) {
        response.end(JSON.stringify(blogData));
        return;
    }
    // 处理User路由
    if (userData) {
        response.end(JSON.stringify(userData));
        return;
    }

    // 未命中 404
    response.writeHead(404, {
        "Content-type": "text/plain"
    })
    response.write("404 Not Found \n")

    response.end()

}

// module.exports = serverHandler
module.exports = {
    serverHandler
}

// process.env.NODE_ENV