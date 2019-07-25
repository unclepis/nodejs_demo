const crypto = require('crypto')

// 密钥

const SECRET_KEY = 'Lwiol_8723#'


// 生成加密密码
function md5(content) {
    let md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

// 加密函数
function genPassWord(password) {
    const str = `password=${password}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = {
    genPassWord 
}