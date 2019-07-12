const env = process.env.NODE_ENV; // 环境变量
let MYSQL_CONFIG = null;
if (env === "dev") {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '19880525LiuLe',
        port: 3306,
        database: 'myblog'
    }
}
if (env === "production") {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '19880525LiuLe',
        port: 3306,
        database: 'myblog'
    }
}

module.exports = {
    MYSQL_CONFIG
}
