// 标准输入输出
// process.stdin.pipe(process.stdout)

// ------------------------------session  1 ---------------------
// const http = require('http')
// const httpServer = http.createServer((req, res) => {
//     if (req.method === 'POST') {
//         req.pipe(res)
//     }
// })
// httpServer.listen(8000, function () {
//     console.log('server is running on 8000')
// })


// ------------------------------session  2---------------------
// const fs = require('fs')
// const path = require('path')
// const filename1 = path.resolve(__dirname, "file1.txt")
// const filename2 = path.resolve(__dirname, "file2.txt")
// const readStream = fs.createReadStream(filename1)
// const writeStream = fs.createWriteStream(filename2)

// readStream.pipe(writeStream)

// readStream.on('data', chunk => {
//     let index = 1;
//     console.log(index++)
//     console.log(chunk.toString())
// })

// readStream.on('end', () => {
//     console.log('process finished')
// })


// ------------------------------session  3---------------------

const http = require('http')
const fs = require('fs')
const path = require('path')
const filename1 = path.resolve(__dirname, 'file1.txt')

const httpServer = http.createServer((req, res) => {
    if (req.method === "GET") {
        const readStream = fs.createReadStream(filename1);
        readStream.pipe(res)
    }
})
httpServer.listen(8000, () => {
    console.log('server is running on 8000')
})