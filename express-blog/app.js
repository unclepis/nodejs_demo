var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session')

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var loginRouter = require('./routes/blogUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev')); // 记录日志
app.use(express.json()); // 解析post请求的body
app.use(express.urlencoded({ extended: false })); // 解析post请求body其他的格式
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// 处理session的中间件，处理之后就可以直接通过req.session访问session了
app.use(session({
  secret: 'WJiol_8776232@',
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  }
}));
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
