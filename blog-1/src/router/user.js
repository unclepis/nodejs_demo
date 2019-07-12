const { SuccessModel, ErrorModel } = require('../model/resMode')
const login = require('../api/login')

const handleUserRouter = (req, res) => {
    const method = req.method;
    const { username, password } = req.body
    // 登陆
    if (method === "POST" && req.path == "/api/user/login") {
        return login(username, password).then(res => {
            if (res && res.length) {
                return new SuccessModel("登陆成功")
            } else {
                return new ErrorModel("用户登陆失败")
            }
        })
    }
}

module.exports = handleUserRouter