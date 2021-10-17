// 商品模块路由文件
// 导入路由
const Router = require('koa-router');

// 导入GoodsController中的各种方法
const { upload } = require('../controller/goods.controller');
// 导入判断用户授权(auth:是否登录) (hadAdmin:是否管理员)是否正常中间件
const { auth, hadAdminPermission } = require('../middleware/auth.middleware');
//导入产品发布参数验证的中间件
const { validator } = require('../middleware/goods.middleware');

// 实例化
// prefix为路由前缀
const goodsRouter = new Router({ prefix: '/goods' });

// 图片上传接口
goodsRouter.post('/upload', upload);
// console.log('触发到了upload');

// 发布商品接口
goodsRouter.post('/', auth, hadAdminPermission, validator, ctx => {
  //   console.log(ctx.request.body);
  ctx.body = '发布商品成功';
});

// 导出，给index注册用
module.exports = goodsRouter;

// test github user.name
