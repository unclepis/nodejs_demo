const { exec } = require('../db/mysql')
const getBlogList = (author, keyword) => {
    // const selectList = `select * from blog where author=${author} and keyword=${keyword}`
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author= '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`
    return exec(sql)
}
const getBlogDetails = (id) => {
    // 返回博客列表
    let sql = `select * from blogs where id ='${id}'`
    return exec(sql)
}

const deleteBlog = (id, author) => {
    let sql = `delete from blogs where id='${id}' and author = '${author}'`
    return exec(sql)
}
const updateBlog = (id, { title, content }) => {
    // 返回博客列表
    let sql = `update blogs set title='${title}',content='${content}' where id=${id}`
    return exec(sql)
}

const createBlog = ({ title, content, author }) => {
    let sql = `insert into blogs (title,content,author,createTime) values('${title}','${content}','${author}',${Date.now()});`
    return exec(sql)
}

module.exports = {
    getBlogList,
    getBlogDetails,
    createBlog,
    deleteBlog,
    updateBlog
}