// 导入数据库操作，因为这里的数据库操作是异步的，所以拿到return回来的结果是一个promise，所以要使用这个方法时，要用await
const { createUser, getUserInfo } = require('../service/user.service');
class userController {
  async register(ctx, next) {
    // 1、获取数据
    // 控制台看一下请求体
    // console.log(ctx.request.body); // 使用post方法时，在postman上配置request内容，可以在控制台打印出来
    // 如果客户端也要查看请求体的内容，就赋值给ctx.body，客户端可以拿到
    // 用解构赋值，将post请求体中的json格式内容，赋值给对应的变量
    const { user_name, password } = ctx.request.body;
    // 补充：对传入的请求体内参数做校验
    // 合法性
    if (!user_name || !password) {
      console.error('用户名或密码为空', ctx.request.body);
      ctx.status = 400; // bad request
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: '',
      };
      // 参数不合法时，中断执行
      return;
    }
    // 合理性
    // service层的查询接口要求参数类型是对象，所以这里需要传递一个对象
    if (getUserInfo({ user_name })) {
      console.error('用户已经存在!');
      ctx.status = 409; // conflict
      ctx.body = {
        code: '10002',
        message: '用户已经存在',
        result: '',
      };
      return;
    }
    // 2、操作数据库
    const res = await createUser(user_name, password);
    // console.log(res);
    // ctx.body = ctx.request.body;
    // 3、处理返回出去的数据
    ctx.body = {
      code: 0,
      message: '数据插入成功!',
      result: { id: res.id, user_name: res.user_name },
    };
  }
  async login(ctx, next) {
    ctx.body = '登录成功';
  }
}

// 导出
// 不直接导出这个类，而是导出这个类实例化出的对象
// 导出给user.route.js使用
module.exports = new userController();
