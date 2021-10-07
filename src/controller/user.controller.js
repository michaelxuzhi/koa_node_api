// 导入jsonwebtoken包，用于登录成功后颁发令牌
const jwt = require('jsonwebtoken');
// 导入密钥，用于token令牌的配置
const { JWT_SECRET } = require('../config/config.default');
// 导入数据库操作，因为这里的数据库操作是异步的，所以拿到return回来的结果是一个promise，所以要使用这个方法时，要用await
const { createUser, getUserInfo, updateById } = require('../service/user.service');
// 导入错误情况
const { userRegisterError } = require('../constant/err.type');
class UserController {
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
    const { user_name } = ctx.request.body;
    // ctx.body = `欢迎回来，${user_name}`;
    // 1、获取用户信息（在token的payload中。需要记录id，user_name，is_admin）
    try {
      const { password, ...resUserInfo } = await getUserInfo({ user_name });
      ctx.body = {
        code: '0 ',
        message: '用户登录成功！',
        result: {
          // token配置参数：{载荷}+密钥+{超时时间}
          token: jwt.sign(resUserInfo, JWT_SECRET, { expiresIn: '1min' }),
        },
      };
    } catch (error) {
      console.log('用户登录失败！', error);
    }
  }
  // 修改用户信息
  async changePassword(ctx, next) {
    // auth中已经解析出payload，将用户的信息存储到ctx.state.user当中了
    // 那么可以借助用户信息，查询数据库，并操作数据库，实际修改用户密码
    // 用户的新密码也已经由加密中间件加密
    // 1、获取数据
    const id = ctx.state.user.id;
    const password = ctx.request.body.password;
    // console.log(id, password);
    // 2、操作数据库
    // 从service层能拿到修改的结果：true/false
    if (await updateById({ id, password })) {
      ctx.body = {
        code: '0',
        message: '密码修改成功！',
        result: '',
      };
    } else {
      ctx.body = {
        code: '10007',
        message: '修改密码失败！',
        result: '',
      };
    }
    // 3、返回结果
    // ctx.body = '成功修改密码！';
    await next();
  }
}

// 导出
// 不直接导出这个类，而是导出这个类实例化出的对象
// 导出给user.route.js使用
module.exports = new UserController();
