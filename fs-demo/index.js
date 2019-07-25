const fs = require('fs')
const path = require('path') // 統一不同操作系統的路徑

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

