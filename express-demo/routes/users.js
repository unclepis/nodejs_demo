var express = require('express');
var router = express.Router();
const exec = require('../db/mysql.js')

router.post('/login', function (req, res) {
  const { username, password } = req.body.data
  const sql = `select * from users where username='${username}' and password='${password}'`
  exec(sql).then(data => {
    if(data&&data[0]){
      req.body.isLogin = true
      res.setHeader('Set-Cookie',`username=${data[0].username};path=/;`)
      res.json({
        msg: '登陆成功',
        username,
        password
      })
    }
  });
});

module.exports = router;
