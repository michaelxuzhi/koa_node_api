// app中的错误统一处理模块
module.exports = (err, ctx) => {
  let status = 300;
  switch (err.code) {
    case '10001':
      status = 400;
      break;
    case '10002':
      status = 409;
      break;
    case '10003':
      status = 400;
      break;
    case '10004':
      status = 400;
      break;
    case '10005':
      status = 400;
      break;
    case '10006':
      status = 400;
      break;
    default:
      status = 500;
      break;
  }
  ctx.status = status;
  ctx.body = err;
};
