// 导入数据库操作，因为这里的数据库操作是异步的，所以拿到return回来的结果是一个promise，所以要使用这个方法时，要用await
const { createUser } = require('../service/user.service');
// 导入错误情况
const { userRegisterError } = require('../constant/err.type');
class userController {
  async register(ctx, next) {
    // 1、获取数据
    // 控制台看一下请求体
    // console.log(ctx.request.body); // 使用post方法时，在postman上配置request内容，可以在控制台打印出来
    // 如果客户端也要查看请求体的内容，就赋值给ctx.body，客户端可以拿到
    // 用解构赋值，将post请求体中的json格式内容，赋值给对应的变量
    const { user_name, password } = ctx.request.body;
    // 2、操作数据库
    // 写入数据库的容错，用try/catch来包含
    try {
      const res = await createUser(user_name, password);
      // console.log(res);
      // ctx.body = ctx.request.body;
      // 3、处理返回出去的数据
      ctx.body = {
        code: 0,
        message: '数据插入成功!',
        result: { id: res.id, user_name: res.user_name },
      };
      console.log('数据插入成功----testing');
    } catch (error) {
      // 打印错误
      console.error('数据插入错误！', error);
      // emit出去，由app做统一错误处理
      ctx.app.emit('error', userRegisterError, ctx);
      return;
    }
  }

  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}

// 导出
// 不直接导出这个类，而是导出这个类实例化出的对象
// 导出给user.route.js使用
module.exports = new userController();
