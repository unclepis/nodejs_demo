var express = require('express');
var router = express.Router();

const login = require('../apiController/user')
const { SuccessModal, ErrorModal } = require('../resModel')

router.post('/login', function (req, res, next) {
    const { username, password } = req.body;
    let loginResult = login(username, password);
    loginResult.then(userInfo => {
        if (userInfo && userInfo[0]) {
            if (userInfo[0].username) {
                req.session.username = userInfo[0].username
                req.session.realname = userInfo[0].realname
            }
            res.json(new SuccessModal(userInfo, '登陆成功'))
            return 
        }
        res.json(new ErrorModal('登陆失败'))
    })
});

router.get('/login-test', function (req, res, next) {
    if (req.session.username) {
        res.json({
            errno: 0,
            msg:'已登录'
        })
        return 
    }
    res.json({
        errno: -1,
        msg:'测试失败'
    })
});

module.exports = router;
