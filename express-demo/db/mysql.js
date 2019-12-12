const mysql = require('mysql')
const config = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'myblog'
}
const connection = mysql.createConnection(config);

// 建立链接
connection.connect();
function exec(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

module.exports = exec