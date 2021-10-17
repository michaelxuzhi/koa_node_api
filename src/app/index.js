// 导入
// path模块，找路径
const path = require('path');
// Koa
const Koa = require('koa');
// 请求体内容解析，这个中间件的导入和注册，必须在路由的内容之前
const KoaBody = require('koa-body');
// 静态资源解析设置中间件
const KoaStatic = require('koa-static');

// 参数校验中间件
const parameter = require('koa-parameter');
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
// console.log(process.cwd());
// koa-body中间件的注册，必须在路由中间件之前
// 补充：使用koa-body进行文件上传的配置
// multipart：解析
// formidable：文件上传的详细配置
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      // 推荐使用绝对路径
      uploadDir: path.join(__dirname, '../uploads'),
      keepExtensions: true,
    },
  })
);
// 配置服务端静态资源目录，让前端可以访问到后端资源文件
app.use(KoaStatic(path.join(__dirname, '../uploads')));

// 参数校验中间件的注册和使用
// 将所有方法都注册到app当中，意味着Koa实例下的所有中间件、路由等都可以直接使用koa-parameter的方法
app.use(parameter(app));
// app中直接可以使用parameter的所有方法
// 但一般不写到这里。会显得很冗杂，参数的校验会放到商品的中间件中
// app.use(async ctx => {
//   ctx.verifyParams({
//     name: 'string',
//   });
// });

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
