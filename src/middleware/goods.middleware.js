// 导入错误类型
const { goodsFormatError } = require('../constant/err.type');

// 商品参数校验中间件
const goodsValidator = async (ctx, next) => {
  // 因为已经在app上全局注册了parmameter的参数校验方法
  // 所以这里可以直接使用
  // 参数通过校验时，会走正常逻辑
  // 参数没有通过校验，parameter抛出一个错误，那么就要捕获
  // 使用的是verifyParams函数
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true },
    });
  } catch (error) {
    // 对错误的处理，并中断后续操作
    // console.log(error);
    goodsFormatError.result = error;
    return ctx.app.emit('error', goodsFormatError, ctx);
  }
  await next();
};

module.exports = { goodsValidator };
