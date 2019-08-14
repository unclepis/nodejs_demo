const fs = require('fs')
const path = require('path') // 統一不同操作系統的路徑
// fs.stat 检测是文件还是目录
// fs.mkdir 创建目录
// fs.writeFile 创建写入文件
// fs.appendFile 追加文件
// fs.readFile 读取文件
// fs.readdir 读取目录
// fs.rename 重命名
// fs.rmdir 删除目录
// fs.unlink 删除文件

const filename = path.resolve(__dirname, 'data.txt') // __direname 当前js文件的目录
// 写入文件
const content = "这个是写入的内容\n"
const opt = {
    flag: 'a' // 追加写入用a,覆盖写入用w
}
// option 1
// fs.writeFile(filename, content, opt, (err) => {
//     if (err) {
//         console.log(err)
//     }
//     //  读取文件
//     fs.readFile(filename, (err, data) => {
//         if (err) {
//             console.log(err)
//             return
//         }
//         // data 是二进制类型，需要转换成字符串
//         console.log(data.toString())
//     })
// })

// 判断文件存在
fs.exists(filename, exist => {
    console.log('file exist is ', exist)
})

// // option 2
// fs.writeFile(filename, content, opt, (err) => {
//     if (err) {
//         console.log(err)
//     }
// })

// //  读取文件
// fs.readFile(filename, (err, data) => {
//     if (err) {
//         console.log(err)
//         return
//     }
//     // data 是二进制类型，需要转换成字符串
//     console.log(data.toString())
// })

