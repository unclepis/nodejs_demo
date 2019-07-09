## 1.http 模块
const http = require('http')
## 2.querystring 模块
const querystring = require('querystring')
## 3.插件
nodemon // 热更新
cross-env // 兼容不同的操作系统

## 4.request和response 用到的api
```javascript
    request.method 
    request.url 
    request.headers 

    response.setHeader  response.setHeader('Content-type',"application/json")

    cross-env //兼容mac和window等不同的操作系统
    NODE_ENV //设置不同的环境变量
```

## 5. 接口设计
1) 获取博客的列表list 
- GET /api/blog/list?author=${author}&keyword=${keyword}
- 可以根据作者名称和关键字过滤


2) 获取博客的详情details 
- GET /api/blog/details?id=${id}
- 根据id查详情

3) 新增一篇博客  
- POST /api/blog/new
- 博客题目和博客内容创建一个博客信息

```javascript
       {
        title:'博客题目',
        content:'博客内容'        
       }
```
4) 删除一篇博客 
- DELETE /api/blog/delete?id=${id}
- 根据id删除一篇博客

5) 更新一篇博客 
- UPDATE /api/blog/update?id=${id}
- 根据id和博客题目,博客内容更新一个博客的信息
 
```javascript
       {
        title:'新的博客题目',
        content:'新的博客内容'        
       }
```
6) 登陆 
- POST /api/user/login
- 用户名密码登陆

```javascript
       {
        username:'用户名',
        password:'密码'        
       }
```