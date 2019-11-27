const config = {
    PORT: 3000, // server拉起的端口
    interface: '/api',
    module: {
        blog: '/blog',
        user: '/user'
    },
    MYSQL_CONFIG:{
        host:'localhost',
        user: 'root',
        password:'123456',
        database:'myblog',
    },
    BLOG_LIST: '/list', // 获取博客列表的接口
    BLOG_NEW: '/new', // 新增博客
    BLOG_DELETE: '/delete', // 删除博客
    BLOG_UPDATE: '/update', // 更新博客
    BLOG_DETAILS: '/details', // 博客详情
    USER_LOGIN: '/login', // 用户登陆
}

module.exports = config