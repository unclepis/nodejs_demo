// 引入fs模块写入日志文件
const fs = require('fs');
// 引入path模块兼容多系统文件路径的问题
const path = require('path')

// 创建stream
const createWriteStream = (filename) => {
    const fulleFileName = path.resolve(__dirname, `${filename}.log`);
    return fs.createWriteStream(fulleFileName, {
        flags: 'a'
    })
}
const accessLog = (log) => {
    createWriteStream('access').write(`${log} \n`);
}
const errorLog = (log) => {
    createWriteStream('error').write(`${log} \n`);
}
const eventLog = (log) => {
    createWriteStream('event').write(`${log} \n`);
}
module.exports = {
    accessLog,
    errorLog,
    eventLog
}