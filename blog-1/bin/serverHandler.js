const handleBlogRouter = require('../src/router/blog')
const handleUserRouter = require('../src/router/user')
const querystring = require('querystring')
const { getPostData } = require('../src/api/blog')

const { redisGet, redisSet } = require('../src/db/redis')

const { writeAccessLog } = require('../src/util/log')

// 过期时间
const getExpireDate = () => {
    return new Date().setTime(Date.now() + 24 * 3600 * 1000) // 一天的过期时间
}

const serverHandler = (req, response) => {
    // 设置返回格式为json
    response.setHeader('Content-type', "application/json");
    // 存储access的访问日志

    writeAccessLog(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)

    // 获取path
    const url = req.url
    req.path = url.split('?')[0];

    // 解析query
    req.query = querystring.parse(url.split('?')[1]);

    // 解析cookie
    req.cookie = {}

    const cookieStr = req.headers.cookie || "";
    cookieStr.split(";").forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split("=");
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    // 解析session使用redis
    let isSetCookie = false
    let userId = req.cookie.userid;

    if (!userId) {
        isSetCookie = true;
        userId = Date.now();
        // 初始化session
        redisSet(userId, {})
    }
    req.sessionId = userId
    redisGet(req.sessionId).then(sessionData => {
        if (sessionData == null) {
            redisSet(req.sessionId, {})
            req.session = {}
        } else {
            req.session = sessionData;
        }
        return getPostData(req)
    }).then(postData => {
        //处理postData
        req.body = postData
        // 处理blog路由
        const blogResult = handleBlogRouter(req, response);
        const userResult = handleUserRouter(req, response);
        if (blogResult) {
            blogResult.then(blogData => {
                if (blogData) {
                    if (isSetCookie) {
                        response.setHeader('Set-Cookie', `userid=${userId};path="/";httpOnly'expires=${getExpireDate()}`)
                    }
                    response.end(JSON.stringify(blogData));
                    return;
                }
            })
        }
        if (userResult) {
            userResult.then(userData => {
                // 处理User路由
                if (userData) {
                    if (isSetCookie) {
                        response.setHeader('Set-Cookie', `userid=${userId};path="/";httpOnly'expires=${getExpireDate()}`)
                    }
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