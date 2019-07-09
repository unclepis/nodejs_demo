const handleUserRouter = (req, res) => {
    const method = req.method;
    // 登陆
    if (method === "POST" && req.path == "/api/user/login") {
        return {
            msg: "登陆"
        }
    }
}

module.exports = handleUserRouter