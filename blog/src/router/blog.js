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
const { getFromRedis } = require('../db/redis')
const loginCheck = () => {
    const isLogin = getFromRedis('username');
    console.log('user is login', isLogin)
    if (!isLogin) {
        return
    }
}
const blogRouterHandler = (req, res) => {
    // 博客列表的接口
    loginCheck();
    if (req.method === 'GET' && req.path === `${interface}${blog}${BLOG_LIST}`) {
        const { author, keyword } = req.query
        let result = getBlogList(author, keyword);
        return result.then(blogListData => {
            console.log(blogListData)
            return new SuccessModal(blogListData, '博客列表的接口查询成功')
        })
    }
    // 新增博客的接口
    if (req.method === 'POST' && req.path === `${interface}${blog}${BLOG_NEW}`) {
        const createBlogRes = createBlog(req.body)
        if (createBlogRes) {
            return new SuccessModal(createBlogRes, '新增blog成功')
        }
    }
    // 博客删除的接口
    if (req.method === 'DELETE' && req.path === `${interface}${blog}${BLOG_DELETE}`) {
        const { id } = req.query;
        if (id) {
            const deleteBlogRes = deleteBlog(id)
            if (deleteBlogRes) {
                return new SuccessModal(deleteBlogRes, '删除blog成功')
            }
        }
    }
    // 博客更新的接口
    if (req.method === 'POST' && req.path === `${interface}${blog}${BLOG_UPDATE}`) {
        const { id } = req.query;
        const updateBlogRes = updateBlog(id, req.body)
        if (updateBlogRes && id) {
            return new SuccessModal(updateBlogRes, '更新blog成功')
        }
    }
    // 博客详情的接口
    if (req.method === 'GET' && req.path === `${interface}${blog}${BLOG_DETAILS}`) {
        const { id } = req.query
        const blogResult = getBlogDetails(id)
        if (blogResult) {
            return blogResult.then(blogDetailsData => {
                return new SuccessModal(blogDetailsData, '博客详情成功')
            })
        }
    }
}

module.exports = blogRouterHandler
