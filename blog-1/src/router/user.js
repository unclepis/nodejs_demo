const { SuccessModel, ErrorModel } = require('../model/resMode')
const { redisSet } = require('../db/redis')
const login = require('../api/login')

const handleUserRouter = (req, res) => {
    const method = req.method;
    const { username, password } = req.query
    // 登陆
    if (method === "GET" && req.path == "/api/user/login") {
        return login(username, password).then(res => {
            if (res && res[0] && res[0].username) {
                req.session.username = res[0].username
                req.session.realname = res[0].realname

                redisSet(req.sessionId, req.session)
                return new SuccessModel("登陆成功")
            }
            return new ErrorModel("用户登陆失败")
        })
    }
}

module.exports = handleUserRouter