// 导入
// Koa
const Koa = require('koa');
// 请求体内容解析，这个中间件的导入和注册，必须在路由的内容之前
const KoaBody = require('koa-body');
// 路由
const userRouter = require('../router/user.route');

// 错误事件处理函数
const errhandler = require('./errhandler');

// 实例化
// Koa的实例
const app = new Koa();
// koa-body中间件的注册，必须在路由中间件之前
app.use(KoaBody());
// 注册中间件，路由中间件的实例
app.use(userRouter.routes());

// 统一错误事件监听，处理
// 因为errhandler导出的是一个匿名函数，所以这里直接使用即可
app.on('error', errhandler);

// 导出
// 给main.js中使用
module.exports = app;
