const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config')

// 创建链接
const con = mysql.createConnection(MYSQL_CONFIG)

con.connect();
// 封装一下mysql查询的函数
function exec(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}
// 关闭连接
// con.end();

module.exports = {
    exec
}