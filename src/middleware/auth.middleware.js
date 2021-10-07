// 此文件：用于授权行为的中间件

// 导入jwt包
const jwt = require('jsonwebtoken');
// 导入密钥
const { JWT_SECRET } = require('../config/config.default');
// 导入错误类型
const {
  tokenExpiredError,
  invalidToken,
  tokenAnalyzeError,
  hasNotAdminPermisson,
} = require('../constant/err.type');

// 验证用户的授权信息，用户是否登录
const auth = async (ctx, next) => {
  console.log('走到了auth');
  // 从请求头中，解构出token
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  //   console.log(token);
  // 用try/catch来包裹
  try {
    console.log('走到了try');
    // payload中包含了（id,user_name,is_admin）
    const payload = jwt.verify(token, JWT_SECRET);
    // 将成功解析出来的payload赋值，以后获取就使用state.user
    ctx.state.user = payload;
    // console.log('auth-payload:', payload);
  } catch (error) {
    console.log('走到了catch', error);
    // console.log('token错误！', error);
    // return;
    // token验证异常处理，因为case中return一个结果出去了，就不用写break了
    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token过期', error);
        return ctx.app.emit('error', tokenExpiredError, ctx);
      case 'JsonWebTokenError':
        console.error('token无效', error);
        return ctx.app.emit('error', invalidToken, ctx);
      default:
        console.error('token解析出错！', error);
        return ctx.app.emit('error', tokenAnalyzeError, ctx);
    }
  }
  await next();
  // console.log('auth结束，肯定触发了next');
};

// 判断用户权限
const hadAdminPermisson = async (ctx, next) => {
  console.log('走到了hadAdmin');
  const { is_admin } = ctx.state.user;
  if (!is_admin) {
    console.error('用户不是管理员', ctx.state.user);
    ctx.app.emit('error', hasNotAdminPermisson, ctx);
    return;
  }
  // console.log('hadAdmin-userinfo', ctx.state.user);
  await next();
};
module.exports = {
  auth,
  hadAdminPermisson,
};
