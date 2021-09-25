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
} = require('../constant/err.type');

const auth = async (ctx, next) => {
  // 从请求头中，解构出token
  const { authorization } = ctx.request.header;
  const toekn = authorization.replace('Bearer ', '');
  //   console.log(toekn);
  // 用try/catch来包裹
  try {
    // payload中包含了（id,user_name,is_admin）
    const payload = jwt.verify(toekn, JWT_SECRET);
    // 将成功解析出来的payload赋值，以后获取就使用state.user
    ctx.state.user = payload;
  } catch (error) {
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
};

module.exports = {
  auth,
};
