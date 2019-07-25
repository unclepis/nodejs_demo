const { exec } = require('../db/mysql')
const login = (username, password) => {
    let sql = `select username,realname from user where username='${username}' and password='${password}'`;
    return exec(sql)
}

module.exports = login  