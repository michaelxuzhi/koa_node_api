// 导入路由
const Router = require('koa-router');
// 实例化
// prefix参数是默认拼接参数，即：prefix+处理函数中的路径，才是最终的路由
const userRouter = new Router({ prefix: '/users' });

// 处理Get，最终实际获得：prefix+/ = /users/
// 第一个参数是路径，第二个参数是回调处理函数
userRouter.get('/', (ctx, next) => {
  ctx.body = 'hello users';
});

// 导出userRouter
module.exports = userRouter;
