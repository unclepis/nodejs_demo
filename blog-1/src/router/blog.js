const { SuccessModel, ErrorModel } = require('../model/resMode')
const { getList, getDetails, deleteBlog, updateBlog, createBlog } = require('../api/blog.js')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    // 获取博客列表
    if (method === "GET" && req.path == "/api/blog/list") {
        const author = req.query.author || ''
        const keyword = req.query.author || ''
        return new SuccessModel(getList(author, keyword))
    }

    // 获取博客的详情details
    if (method === "GET" && req.path == "/api/blog/details") {
        const id = req.query.id || ''
        return new SuccessModel(getDetails(id))
    }
    // 新增一篇博客
    if (method === "POST" && req.path == "/api/blog/new") {
        const { title, content } = req.body;
        return new SuccessModel(createBlog({ title, content }))
    }

    // 删除一篇博客
    if (method === "DELETE" && req.path == "/api/blog/delete") {
        const id = req.query.id || ''
        return new SuccessModel(deleteBlog(id))
    }

    // 更新一篇博客
    if (method === "PUT" && req.path == "/api/blog/update") {
        const id = req.query.id || ''
        const { title, content } = req.body;
        return new SuccessModel(updateBlog(id, { title, content }))
    }
}

module.exports = handleBlogRouter