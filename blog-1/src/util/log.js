const fs = require('fs')
const path = require('path')

// 生成流
const createWriteStream = (filename) => {
    const fullFileName = path.join(__dirname, '../', '../', 'logs', filename)
    return fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
}
const accessStream = createWriteStream('access.log')
const eventStream = createWriteStream('event.log')
const errorStream = createWriteStream('error.log')

// 写日志
const writeLog = (writeStream, log) => {
    writeStream.write(log + '\n')
}

// 写access日志
function writeAccessLog(log) {
    writeLog(accessStream, log)
}
// 写event日志
function writeEventLog(log) {
    writeLog(eventStream, log)
}
// 写error日志
function writeErrorLog(log) {
    writeLog(errorStream, log)
}

module.exports = {
    writeAccessLog,
    writeEventLog,
    writeErrorLog
}