class userController {
  async register(ctx, next) {
    // 控制台看一下请求体
    console.log(ctx.request.body); // 使用post方法时，在postman上配置request内容，可以在控制台打印出来
    ctx.body = ctx.request.body;
  }
  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}

// 导出
// 不直接导出这个类，而是导出这个类实例化出的对象
// 导出给user.route.js使用
module.exports = new userController();
