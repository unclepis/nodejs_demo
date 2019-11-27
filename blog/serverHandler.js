// 引入querystring解析url中的query参数
const querystring = require('querystring')

// 引入路由处理
const blogRouterHandler = require('./src/router/blog')
const userRouterHandler = require('./src/router/user')

// 引入redis存储读取的方法
const { saveInRedis, getFromRedis } = require('./src/db/redis')

// 获取 cookie 的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log('d.toGMTString() is ', d.toGMTString())
    return d.toGMTString()
}

// 专门用来处理post请求的body数据
const getPostBodyData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") { // 不是post请求拦截
            resolve({})
            return
        }

        if (req.headers['content-type'] !== "application/json") { // post不是传递json数据拦截
            resolve({})
            return
        }
        let blogData = "";
        req.on('data', chunk => {
            blogData += chunk.toString()
        })
        req.on('end', () => {
            if (blogData) {
                resolve(JSON.parse(blogData))
                return
            }
            // body中空的拦截
            resolve({})
            return
        })
    })

}
const serverHandler = (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    // 解析客户端请求的基本数据
    const method = req.method;
    const url = req.url;
    const queryString = querystring.parse(url.split('?')[1]);
    const path = url.split('?')[0]
    // 扩展req的参数
    req.path = path;
    req.query = queryString;

    // 解析cookie
    req.cookie = {};
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(element => {
        if (!element) {
            return
        }
        const arr = element.split('=')
        const key = arr[0]
        const value = arr[1]
        req.cookie[key] = value
    });

    // 解析session
    let needSetCookie = false;
    let userId = req.cookie.userid;
    if (!userId) {
        needSetCookie = true;
        userId = `${Date.now()}_${Math.random()}`
        // 初始化session
        saveInRedis(userId, {})
    }

    // 获取session
    req.sessionID = userId;
    getFromRedis(req.sessionID).then(sessionData => {
        if (sessionData == null) {
            // 初始化session
            saveInRedis(userId, {})
            req.session = {}
        } else {
            req.session = sessionData;
        }
        console.log('req.session', req.session)
        // 处理post请求异步的body中携带的数据
        return getPostBodyData(req)
    }).then(postData => {
        // 将解析的body数据放入req的body中在路由中使用
        req.body = postData;
        // 处理页面路由
        const blogResult = blogRouterHandler(req, res);
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(blogData))
            })
            return
        }
        const userResult = userRouterHandler(req, res);
        if (userResult) {
            userResult.then(userData => {
                if (needSetCookie) {
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
                res.end(JSON.stringify(userData))
            })
            return
        }
        // 处理异常路由
        res.writeHead(404, { 'content-Type': 'text/plain' })
        res.write('404 Not Fount \n');
        res.end();
    });
}
module.exports = serverHandler