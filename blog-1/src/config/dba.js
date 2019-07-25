const env = process.env.NODE_ENV; // 环境变量
let MYSQL_CONFIG = {
    host: 'localhost',
    user: 'root',
    password: '19880525LiuLe',
    port: 3306,
    database: 'myblog'
};
let REDIS_CONFIG = {
    host: '127.0.0.1',
    port: 6379,
};


if (env === "dev") {
    MYSQL_CONFIG = {
        host: 'localhost',
        user: 'root',
        password: '19880525LiuLe',
        port: 3306,
        database: 'myblog'
    }
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379,
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
    REDIS_CONFIG = {
        host: '127.0.0.1',
        port: 6379,
    }
}



module.exports = {
    MYSQL_CONFIG,
    REDIS_CONFIG
}
