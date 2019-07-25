const redis = require('redis')
const { REDIS_CONFIG } = require('../config/dba')
console.log(REDIS_CONFIG);
const { host, port } = REDIS_CONFIG;
const redisClient = redis.createClient(port, host)

redisClient.on('error', err => {
    if (err) {
        console.log(err);
    }
})

// 封装redis的set方法
const redisSet = (key, value) => {
    // redis的key和value要是字符串格式的
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

// 封装redis的get方法
const redisGet = (key) => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch (error) {
                resolve(val)
            }
            console.log(`redisGet val ${key} is `, val)
            resolve(val)
            // redisClient.quit()
        })
    })
}

module.exports = {
    redisSet,
    redisGet
}