const {
    interface,
    module: {
        user
    },
    USER_LOGIN
} = require('../../config')
const login = require('../apiController/user')
const { SuccessModal, ErrorModal } = require('../resModel')

const { saveInRedis } = require('../db/redis')

const userRouterHandler = (req, res) => {
    // 用户登陆的接口
    if (req.method === 'POST' && req.path === `${interface}${user}${USER_LOGIN}`) {
        const { username, password } = req.body;
        let loginResult = login(username, password);
        return loginResult.then(userInfo => {
            if (userInfo && userInfo[0]) {
                if (userInfo[0].username) {
                    req.session.username = userInfo[0].username
                    req.session.realname = userInfo[0].realname
                    saveInRedis(req.sessionID, req.session)
                }
                return new SuccessModal(userInfo, '登陆成功')
            }
            return new ErrorModal('登陆失败')
        })
    }
    return Promise.reject('路由不存在')
    // if (req.method === 'GET' && req.path === `${interface}${user}/login-test`) {
    //     if (req.cookie.userid) {
    //         return Promise.resolve(new SuccessModal(req.session))
    //     }
    //     return Promise.resolve(new ErrorModal('尚未登陆'))
    // }
}

module.exports = userRouterHandler