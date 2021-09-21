// 导入路由
const Router = require('koa-router');
// 导入验证器，在controller之前先把关
const { userValidator, verifyUser } = require('../middleware/user.middleware');

// 新版：通过controller下的对应处理文件来触发回调
// require的是controller中实例化出来的一个对象，我们要使用的是对象中的一个方法，所以进行解构
const { register, login } = require('../controller/user.controller');
// 实例化
// prefix参数是默认拼接参数，即：prefix+处理函数中的路径，才是最终的路由
const userRouter = new Router({ prefix: '/users' });

// 旧版：处理不同的路由
// 处理Get，最终实际获得：prefix+/ = /users/
// 第一个参数是路径，第二个参数是回调处理函数
// userRouter.get('/', (ctx, next) => {
//   ctx.body = 'hello users';
// });

// 根据接口文档，使用正确的http方式
userRouter.post('/register', userValidator, verifyUser, register);
userRouter.post('/login', login);

// 导出userRouter
module.exports = userRouter;
