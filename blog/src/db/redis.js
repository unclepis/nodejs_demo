// 引入redis
const redis = require('redis')
let REDIS_CONFIG = {}
// 获取node的环境变量
const env = process.env.NODE_ENV

// 根据线上线下地址获取redis的配置
if (env === 'dev') {
    REDIS_CONFIG = {
        host: 'localhost',
        port: '6379'
    }
} else {
    REDIS_CONFIG = {
        host: 'localhost',
        port: '6379'
    }
}
const PORT = REDIS_CONFIG.port
const HOST = REDIS_CONFIG.HOST
// 
const redisClient = redis.createClient(PORT, HOST)
redisClient.on('error', err => {
    console.log(err)
})

// 保存数据到redis并序列化
const saveInRedis = (key, value) => {
    if (typeof value === 'object') {
        redisClient.set(key, JSON.stringify(value))
        return
    }
    redisClient.set(key, value, redis.print)
}

//获取redis的数据
const getFromRedis = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    saveInRedis,
    getFromRedis
}