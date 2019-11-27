const fs = require('fs');
const path = require('path')

// 使用fs直接读取
// const fullFileName = path.resolve(__dirname, 'a.json')
// fs.readFile(fullFileName, (error, data) => {
//     if (error) {
//         console.errpr(error)
//         return
//     }
//     console.log(data.toString())
// })

// // callback
// const getFileContent = (fileName, callBack) => {
//     const fullFileName = path.resolve(__dirname, fileName)
//     fs.readFile(fullFileName, (err, data) => {
//         if (err) {
//             console.errpr(error)
//             return
//         }
//         callBack(JSON.parse(data.toString()))
//     })
// }

// // callBack hell
// getFileContent('a.json', data => {
//     console.log('a json ', data)
//     getFileContent(data.next, dataB => {
//         console.log('b json ', dataB)
//         getFileContent(dataB.next, datac => {
//             console.log('c json ', datac)
//         })
//     })
// })

// promise
const getFileContent = (fileName) => {
    return new Promise((resolve, reject) => {
        const fullFileName = path.resolve(__dirname, fileName)
        fs.readFile(fullFileName, (err, data) => {
            if (err) {
                reject(error)
            }
            resolve(JSON.parse(data.toString()))
        })
    })
}

// 通过promise的链式调用返回新的promise然后then接收
getFileContent('a.json').then(dataA => {
    console.log('a json ', dataA)
    return getFileContent(dataA.next)
}).then(dataB => {
    console.log('b json ', dataB)
    return getFileContent(dataB.next)
}).then(dataC => {
    console.log('c json ', dataC)
}).catch(err => {
    console.error(err)
})

