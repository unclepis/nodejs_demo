const http = require('http')
const url = require("url");

// 1.create server
const httpServer = http.createServer((req, res) => {

    // 2.设置 HTTP 头部，状态码是 200，文件类型是 html，字符集是 utf8
    res.writeHead(200, {
        "Content-Type": "text/html;charset=UTF-8"
    });

    // 3.往页面打印值
    res.write('<h1 style="text-align:center">Hello NodeJS</h1>');
    // http://localhost:3000/?userName=jsLearner&userAge=23
    if (req.url != "/favicon.ico") {
        console.log('req.url is ', req.url)
        // url.parse
        let result = url.parse(req.url, true);
        console.log(`url parse result is `, result)

        let formateUrl = url.format(req.url)
        console.log('url formate result is ', formateUrl)

        let resolveUrl = url.resolve('217.0.0.1/home', 'index')
        console.log('url resolve is use to 替换 域名后面第一个“/”后的内容', resolveUrl)
    }

    // 4.结束响应
    res.end();
})

// 5.监听的端口
httpServer.listen(3000, () => {
    console.log('server is running on 3000')
})


