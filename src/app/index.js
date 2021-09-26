// 导入
// Koa
const Koa = require('koa');
// 请求体内容解析，这个中间件的导入和注册，必须在路由的内容之前
const KoaBody = require('koa-body');
// 旧版：路由
// const userRouter = require('../router/user.route'); // 用户模块
// const goodsRouter = require('../router/goods.route'); // 商品模块
// 新版-路由导入
const router = require('../router/routeslist');
// 错误事件处理函数
const errhandler = require('./errhandler');

// 实例化
// Koa的实例
const app = new Koa();
// koa-body中间件的注册，必须在路由中间件之前
app.use(KoaBody());
// 旧版：注册中间件，路由中间件的实例
// app.use(userRouter.routes()); // 用户模块
// app.use(goodsRouter.routes()); // 商品模块
// 新版-路由注册
app.use(router.routes());
// 限制路由接口的http请求方式，只允许router层规定的方式
app.use(router.allowedMethods());
// 统一错误事件监听，处理
// 因为errhandler导出的是一个匿名函数，所以这里直接使用即可
app.on('error', errhandler);

// 导出
// 给main.js中使用
module.exports = app;
