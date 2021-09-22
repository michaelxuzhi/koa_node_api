// 将参数验证等功能，拆分成单一职责的中间件，每个流程由一个或多个中间件负责，但不堆积在主逻辑当中

// 导入bcryptjs，加密中间件需求
const bcrypt = require('bcryptjs');

// 导入Model，对数据库有查询需求
const { getUserInfo } = require('../service/user.service');

// 导入错误类型，避免在中间件里面特殊处理
const {
  userFormatError,
  userAlreadyExisted,
  userRegisterError,
  userDoesNotExist,
  userLoginError,
  invalidPasword,
} = require('../constant/err.type');

// 参数验证器-合法性
const userValidator = async (ctx, next) => {
  // 解构参数
  const { user_name, password } = ctx.request.body;
  // 补充：对传入的请求体内参数做校验
  // 合法性
  // 不合法时:
  if (!user_name || !password) {
    // console.error('用户名或密码为空-来自中间件层log记录', ctx.request.body);
    // 将错误信息提交到app中，由app来同一处理
    ctx.app.emit('error', userFormatError, ctx);
    console.log('userValidator-不合法----testing');
    // 参数不合法时，中断执行
    return;
  }
  // 合法时，交由下一个中间件处理
  console.log('userValidator-合法----testing');
  await next();
};

// 用户验证器-合理性
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  // service层的查询接口要求参数类型是对象，所以这里需要传递一个对象
  // 补充容错
  try {
    const res = await getUserInfo({ user_name });
    if (res) {
      // 打印错误信息，记录在服务器中
      console.error('用户已经存在-来自中间件层log记录', user_name);
      // 将错误信息提交到app中，由app来同一处理
      ctx.app.emit('error', userAlreadyExisted, ctx);
      return;
    }
  } catch (error) {
    console.error('获取用户信息错误！', error);
    ctx.app.emit('error', userRegisterError, ctx);
    return;
  }
  await next();
};

// 加密中间件
const cryptPassword = async (ctx, next) => {
  // 获取请求体中的原密码
  const { password } = ctx.request.body;
  // 从加密库中获取salt-盐
  const salt = bcrypt.genSaltSync(10);
  // hash加密，得到的是密文
  const hash = bcrypt.hashSync(password, salt);
  // 用密文代替password返回出去
  ctx.request.body.password = hash;
  // 处理好password。交由下一个中间件处理
  await next();
};

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    // 1、判断用户是否存在
    // 通过用户名去查询数据库（不存在：报错）
    const res = await getUserInfo({ user_name });
    // 用户不存在
    if (!res) {
      console.error('用户名不存在数据库中', user_name);
      ctx.app.emit('error', userDoesNotExist, ctx);
      return;
    }
    // 2、密码是否匹配（不匹配，报错）
    // 解析出数据库中用户信息的加密密码
    // 密码不匹配
    if (!bcrypt.compareSync(password, res.password)) {
      ctx.app.emit('error', invalidPasword, ctx);
      return;
    }
  } catch (error) {
    console.error(error);
    ctx.app.emit('error', userLoginError, ctx);
    return;
  }
  // 密码匹配，交由下一个中间件处理
  await next();
};

// 导出
module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
};
