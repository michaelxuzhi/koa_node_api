// 导入错误类型
const { cartFormatError } = require('../constant/err.type');
// 购物车模块的数据格式校验器
const cartValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      // goods_id: { type: 'number', required: true },
      goods_id: 'number', // 简写
    });
  } catch (error) {
    // 对错误的处理，并中断后续操作
    // console.log(error);
    cartFormatError.result = error;
    return ctx.app.emit('error', cartFormatError, ctx);
  }
};

// 导出中间件
module.exports = { cartValidator };
