const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../util/cryp')
const login = (username, password) => {
    username = escape(username) // 使用escape对特殊字符转码再sql的字符串拼接就不需要单引号了
    password = genPassword(password);
    password = escape(password)
    const sql = `select * from users where username=${username} and password=${password}`
    return exec(sql)
}
module.exports = login