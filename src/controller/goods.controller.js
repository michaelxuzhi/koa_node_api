// 商品模块的控制器文件
// 导入path，用于成功上传文件后拼接url返回给前端
const path = require('path');
// 导入错误类型
const { fileUploadError, unSupportedFileType } = require('../constant/err.type');
class GoodsController {
  async upload(ctx, next) {
    console.log('走到了upload，图片上传成功');
    // 获取到上传到服务器的文件信息
    // ctx.request.files是请求上传的文件一个整体对象：{key:{}}
    // filesFromUser对应的是上传时用的key（自己设置），如：postman中Body->form-data用的就是filesFromUser来代替
    // console.log(ctx.request.files);
    // 对ctx.request.files进行解构，获取上传的文件信息
    const { filesFromUser } = ctx.request.files;
    // 如果文件上传，就能获取该文件信息
    // 设置可接收文件格式
    const fileTypes = ['image/jpeg', 'image/png'];
    if (filesFromUser) {
      // 过滤判断一下传入的文件格式，使用数组的includes方法，返回一个boolean
      // false的情况，返回出去一个错误提示
      if (!fileTypes.includes(filesFromUser.type)) {
        return ctx.app.emit('error', unSupportedFileType, ctx);
      }
      // console.log(filesFromUser);
      // 文件格式符合，true的情况，则继续执行
      ctx.body = {
        code: 0,
        message: '文件上传成功',
        // 这里的result是为了给前端返回一个url，让前端能访问到这个成功上传的文件
        result: {
          goodsImg: path.basename(filesFromUser.path),
        },
      };
    } else {
      return ctx.app.emit('error', fileUploadError, ctx);
    }
  }
}

// 导出
// 不直接导出这个类，而是导出这个类实例化出的对象
// 导出给goods.route.js使用
module.exports = new GoodsController();
