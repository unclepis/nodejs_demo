const { exec } = require('../db/mysql')
const getList = (author, keyword) => {
    // const selectList = `select * from blog where author=${author} and keyword=${keyword}`
    let sql = `select * from blog where 1=1 `
    if (author) {
        sql += `and author= '${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createTime desc;`
    return exec(sql)
}
const getDetails = (id) => {
    // 返回博客列表
    let sql = `select * from blog where id ='${id}'`
    return exec(sql)
}

const deleteBlog = (id, author) => {
    let sql = `delete from blog where id='${id}' and author = '${author}'`
    return exec(sql)
}
const updateBlog = (id, { title, content }) => {
    // 返回博客列表
    let sql = `update blog set title='${title}',content='${content}' where id=${id}`
    return exec(sql)
}

const createBlog = ({ title, content, author }) => {
    let sql = `insert into blog (title,content,author,createTime) values('${title}','${content}','${author}',${Date.now()});`
    return exec(sql)
}

const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== "POST") {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== "application/json") {
            resolve({})
            return
        }
        let postData = ""
        req.on('data', chunk => {
            postData += chunk;
        })
        req.on('end', () => {
            postData ? resolve(JSON.parse(postData)) : resolve({})
        })
    })
}

module.exports = {
    getPostData,
    getList,
    getDetails,
    deleteBlog,
    updateBlog,
    createBlog
}