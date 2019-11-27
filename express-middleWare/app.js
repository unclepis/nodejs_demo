const express = require('express')

// http请求的实例
const app = express()

app.use((req, res, next) => {
    console.log('请求开始...', req.method, req.url)
    next()
})

app.use((req, res, next) => {
    // 模拟处理cookies
    req.cookie = {
        userId: '123'
    }
    next()
})

app.use((req, res, next) => {
    // 模拟处理postData
    setTimeout(() => {
        req.body = {
            a: 100,
            b: 200
        }
        next()
    })
})

app.use('/api', (req, res, next) => {
    console.log('处理 /api路由')
    next()
})
app.get('/api', (req, res, next) => {
    console.log('get /api路由')
    next()
})
app.post('/api', (req, res, next) => {
    console.log('post /api路由')
    next()
})

// loginCheck的中间件
const loginCheck = (req, res, next) => {
    console.log('登陆成功')
    next()
}
app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('get /api/get-cookie')
    res.json({ // 返回get请求数据
        errno: 0,
        data: req.cookie
    })
})
app.post('/api/get-post-data', (req, res, next) => {
    console.log('post /api/post-get-post-data')
    res.json({ // 返回post请求
        errno: 0,
        data: req.body
    })
})
app.use((req, res, next) => {
    console.log('处理404')
    res.json({ // 都未返回的画返回404
        errno: -1,
        data: '404 Not Found'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})