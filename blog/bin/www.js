// 第一步 引入http 的模块
const http = require('http')
// 引入server的配置文件
const config = require('../config')
const { PORT } = config
// 引入serverHandler统一拦截处理服务端的请求
const serverHandler = require('../serverHandler')
// 创建server
const server = http.createServer(serverHandler);
// 监听server
server.listen(PORT)
console.log('server is running on port:', PORT)