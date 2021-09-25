// 商品模块路由文件
// 导入路由
const Router = require('koa-router');

// 导入GoodsController中的各种方法
const { upload } = require('../controller/goods.controller');

// 实例化
// prefix为路由前缀
const goodsRouter = new Router({ prefix: '/goods' });

// 图片上传接口
goodsRouter.post('/upload', upload);

// 导出，给index注册用
module.exports = goodsRouter;
