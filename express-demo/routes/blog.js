var express = require('express');
var router = express.Router();

const loginCheck = require('../middleWare/loginCheck')
const exec = require('../db/mysql.js')
// 获取博客列表
router.get('/list', loginCheck, (req, res) => {
  const { title } = req.query;
  let sql = `select * from blogs where 1=1 `
  if(req.cookies.username!='admin'){
    sql += `and author= '${req.cookies.username}' `
  }
  if (title) {
    sql += `and title like '%${title}%' `
  }
  sql += `order by createTime desc`
  exec(sql).then(data => {
    res.json({
      msg: '请求列表成功',
      data
    })
  });

})
// 获取博客详情
router.get('/detail', (req, res) => {
  const { id } = req.query;
  let sql = `select * from blogs where id='${id}' `
  exec(sql).then(data => {
    res.json({
      msg: '获取博客详情成功',
      data
    })
  });
})
// 新增博客
router.post('/new', (req, res) => {
  const { title, content } = req.body.data;
  let sql = `insert into blogs (author,title,content,createTime) values ('${req.cookies.username}','${title}','${content}','${Date.now()}')`
  exec(sql).then(data => {
    res.json({
      msg: '新增博客成功',
      data: {
        title, content
      }
    })
  });
})
// 删除博客
router.post('/del', (req, res) => {
  const { id } = req.body.data;
  let sql = `delete from blogs where id=${id}`
  exec(sql).then(data => {
    res.json({
      msg: '删除博客成功',
      data: {
        id
      }
    })
  });
})
// 修改博客
router.post('/update', (req, res) => {
  const { title, content, id } = req.body.data;
  let sql = `update blogs set title='${title}',content='${content}' where id=${id}`
  exec(sql).then(data => {
    res.json({
      msg: '编辑博客成功',
      data: {
        title, content, id
      }
    })
  });
})

module.exports = router;
