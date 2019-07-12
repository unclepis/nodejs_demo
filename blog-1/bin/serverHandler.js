const handleBlogRouter = require('../src/router/blog')
const handleUserRouter = require('../src/router/user')
const querystring = require('querystring')
const { getPostData } = require('../src/api/blog')

const serverHandler = (req, response) => {
    // 设置返回格式为json
    response.setHeader('Content-type', "application/json");
    // 获取path
    const url = req.url
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);

    //处理postData
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, response);
        const userResult = handleUserRouter(req, response);
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                    response.end(JSON.stringify(blogData));
                    return;
                }
            })
        }
        if (userResult) {
            userResult.then(userData => {
                // 处理User路由
                if (userData) {
                    response.end(JSON.stringify(userData));
                    return;
                }
            })
        }

        // 未命中 404
        if (!blogResult && !userResult) {
            response.writeHead(404, {
                "Content-type": "text/plain"
            })
            response.write("404 Not Found \n")
            response.end()
        }


    }).catch(err => {
        console.error(err)
    });
}

// module.exports = serverHandler
module.exports = {
    serverHandler
}

// process.env.NODE_ENV