const loginCheck = (req, res, next) => {
    if (req.cookies.username) {
        next()
    }else{
        res.send({
            data:null,
            msg:'尚未登陆'
        })
    }
}

module.exports = loginCheck