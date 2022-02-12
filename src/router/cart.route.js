// 1、导入koa-router
const Router = require('koa-router');
// 中间件
const { auth } = require('../middleware/auth.middleware');
const { cartValidator } = require('../middleware/cart.middleware');
// 控制器
// 2、实例化koa_router
const cartRouter = new Router({ prefix: '/cart' });
// 3、编写路由规则

// 3.1、添加到购物车接口：登录校验，格式校验
// 在auth中间件中，用户的信息会记录在ctx.state.user中，如果需要二次验证，可以用这个变量来进行操作
cartRouter.post('/', auth, cartValidator, ctx => {
  ctx.body = {
    code: 200,
    msg: '添加购物车成功',
  };
});
// 4、导出路由对象

module.exports = cartRouter;
