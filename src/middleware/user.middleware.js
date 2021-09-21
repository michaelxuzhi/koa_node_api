// 将错误处理抽离出来，作为一个统一的验证处理中间件，需要时调用，避免在主逻辑中写过多重复冗余的错误处理和验证的代码

// 导入Model，对数据库有查询需求
const { getUserInfo } = require('../service/user.service');

// 导入错误类型，避免在中间件里面特殊处理
const { userFormatError, userAlreadyExisted } = require('../constant/err.type');

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
    // 参数不合法时，中断执行
    return;
  }
  // 合法时，交由下一个中间件处理
  await next();
};

// 用户验证器-合理性
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  // service层的查询接口要求参数类型是对象，所以这里需要传递一个对象
  if (getUserInfo({ user_name })) {
    // console.error('用户已经存在-来自中间件层log记录', ctx.request.body);
    // 将错误信息提交到app中，由app来同一处理
    ctx.app.emit('error', userAlreadyExisted, ctx);
    return;
  }
  await next();
};

// 导出
module.exports = {
  userValidator,
  verifyUser,
};
