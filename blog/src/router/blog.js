const {
    interface,
    module: {
        blog
    },
    BLOG_LIST,
    BLOG_NEW,
    BLOG_DELETE,
    BLOG_UPDATE,
    BLOG_DETAILS
} = require('../../config')

const { SuccessModal, ErrorModal } = require('../resModel')
const {
    getBlogList, // 获取博客列表的接口
    getBlogDetails, // 获取博客详情的接口
    createBlog,
    deleteBlog,
    updateBlog
} = require('../apiController/blog')

// 统一的登录验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(
            new ErrorModal('尚未登录')
        )
    }
}
const blogRouterHandler = (req, res) => {
    // 博客列表的接口
    if (req.method === 'GET' && req.path === `${interface}${blog}${BLOG_LIST}`) {
        let { author, keyword } = req.query
        if (req.query.isadmin) {
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if (loginCheckResult) {
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }
        let result = getBlogList(author, keyword);
        return result.then(blogListData => {
            return new SuccessModal(blogListData, '博客列表的接口查询成功')
        })
    }
    // 新增博客的接口
    if (req.method === 'POST' && req.path === `${interface}${blog}${BLOG_NEW}`) {
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        req.body.author = req.session.username
        const createBlogRes = createBlog(req.body)
        return createBlogRes.then(createBlog => {
            return new SuccessModal(createBlogRes, '新增blog成功')
        })
    }
    // 博客删除的接口
    if (req.method === 'POST' && req.path === `${interface}${blog}${BLOG_DELETE}`) {
        const { id } = req.query;
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }

        const author = req.session.username
        if (id) {
            const deleteBlogRes = deleteBlog(id, author)
            return deleteBlogRes.then(delData => {
                return new SuccessModal(deleteBlogRes, '删除blog成功')
            })
        }
    }
    // 博客更新的接口
    if (req.method === 'POST' && req.path === `${interface}${blog}${BLOG_UPDATE}`) {
        const { id } = req.query;
        const loginCheckResult = loginCheck(req)
        if (loginCheckResult) {
            // 未登录
            return loginCheckResult
        }
        const updateBlogRes = updateBlog(id, req.body)
        return updateBlogRes.then(updateBlogData => {
            return new SuccessModal(updateBlogData, '更新blog成功')
        })
    }
    // 博客详情的接口
    if (req.method === 'GET' && req.path === `${interface}${blog}${BLOG_DETAILS}`) {
        const { id } = req.query
        const blogResult = getBlogDetails(id)
        if (blogResult) {
            return blogResult.then(blogDetailsData => {
                return new SuccessModal(blogDetailsData[0], '博客详情成功')
            })
        }
    }
    return Promise.reject('路由不存在')
}

module.exports = blogRouterHandler
