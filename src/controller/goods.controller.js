// 商品模块的控制器文件
class GoodsController {
  async upload(ctx, next) {
    ctx.body = '图片上传成功!';
  }
}

// 导出
// 不直接导出这个类，而是导出这个类实例化出的对象
// 导出给goods.route.js使用
module.exports = new GoodsController();
