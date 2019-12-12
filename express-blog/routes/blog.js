var express = require('express');
var router = express.Router();

const { SuccessModal, ErrorModal } = require('../resModel')
const {
    getBlogList, // 获取博客列表的接口
    getBlogDetails, // 获取博客详情的接口
    createBlog,
    deleteBlog,
    updateBlog
} = require('../apiController/blog')

// 登陆检测的中间件
const loginCheck = (req, res, next) => {
    if (!req.session.username) {
        res.json('尚未登陆')
    } else {
        next()
    }
}
// 博客列表的接口
router.get('/list', function (req, res, next) {
    let { author = '', keyword = '' } = req.query
    // if (isadmin) {
    //     author = req.session.username
    // }
    let result = getBlogList(author, keyword);

    result.then(blogListData => {
        res.json(new SuccessModal(blogListData, '博客列表的接口查询成功'))
    })
});

router.get('/details', function (req, res, next) {
    // res.setHeader('Content-type','application/json')
    // res.end(JSON.stringify(Data))
    res.json({
        errorno: 0,
        data: 'OK'
    })
});

module.exports = router;
