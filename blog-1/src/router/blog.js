const { SuccessModel, ErrorModel } = require('../model/resMode')
const { getList, getDetails, deleteBlog, updateBlog, createBlog } = require('../api/blog.js')

const handleBlogRouter = (req, res) => {
    const method = req.method;
    const id = req.query.id;
    const author = req.query.author;
    // 获取博客列表
    if (method === "GET" && req.path == "/api/blog/list") {
        const author = req.query.author || ''
        const keyword = req.query.keyword || ''
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客的详情details
    if (method === "GET" && req.path == "/api/blog/details") {
        return getDetails(id).then(blogItem => {
            if (blogItem) {
                return new SuccessModel(blogItem[0])
            } else {
                return new ErrorModel("获取详情出错")
            }
        })
    }
    // 新增一篇博客
    if (method === "POST" && req.path == "/api/blog/new") {
        const postData = req.body;
        return createBlog(postData).then(res => {
            if (res && res.affectedRows === 1) {
                return new SuccessModel({
                    id: res.insertId
                })
            }
            else {
                return new ErrorModel("新增博客失败")
            }
        })
    }

    // 删除一篇博客
    if (method === "DELETE" && req.path == "/api/blog/delete") {
        return deleteBlog(id, author).then(res => {
            if (res && res.affectedRows === 1) {
                return new SuccessModel("删除博客成功")
            }
            else {
                return new ErrorModel("删除博客失败")
            }
        })
    }

    // 更新一篇博客
    if (method === "POST" && req.path == "/api/blog/update") {
        const postData = req.body;
        return updateBlog(id, postData).then(res => {
            if (res && res.affectedRows === 1) {
                return new SuccessModel("更新博客成功")
            }
            else {
                return new ErrorModel("更新博客失败")
            }
        })
    }
}

module.exports = handleBlogRouter