// 商品模块的控制器文件
// 导入path，用于成功上传文件后拼接url返回给前端
const path = require('path');
// 导入错误类型
const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsId,
  updateGoodsError,
  deleteGoodsError,
  softRemoveGoodsError,
} = require('../constant/err.type');

// 导入goods的service层写入数据库类
const {
  createGoods,
  updateGoods,
  removeGoods,
  softRemoveGoods,
} = require('../service/good.service');

// 控制器中一般是最后一个中间件，所以写不写next都可以
class GoodsController {
  // 文件上传中间件
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

  // 写入数据库
  async create(ctx, next) {
    // 操作数据库
    // 调用service的craeteGoods方法，将request.body中通过参数检验的合法商品参数写入数据库
    try {
      // 写入数据库成功后，获取到返回结果
      // const result = await createGoods(ctx.request.body);
      const { createdAt, updatedAt, ...res } = await createGoods(ctx.request.body);
      // 将结果返回出去
      ctx.body = {
        code: 0,
        message: '商品发布成功！',
        result: res,
      };
    } catch (error) {
      console.log(error);
      return ctx.app.emit('error', publishGoodsError, ctx);
    }
  }

  // 商品信息修改
  async update(ctx, next) {
    // 操作数据库
    // 调用service的updateGoods方法，将request.body中通过参数检验的合法商品参数写入数据库
    try {
      // 更新数据库中商品信息成功后，获取到返回结果
      // 需要的参数：商品id、所要修改的商品信息
      const res = await updateGoods(ctx.params.id, ctx.request.body);
      // 如果修改成功，从goods.service那边返回的res=true，否则res=false
      // 将结果返回出去
      if (res) {
        ctx.body = {
          code: 0,
          message: '商品信息修改成功！',
          // result: res,
          // 可以不返回result，因为前端只需要知道状态
          result: '',
        };
      }
      // 防止前端传入的修改商品id不存在数据库中，导致修改res=false
      else {
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch (error) {
      console.log(error);
      return ctx.app.emit('error', updateGoodsError, ctx);
    }
  }
  // 商品信息删除-硬删除
  async remove(ctx, next) {
    // 操作数据库
    // 调用service的removeGoods方法，将数据库中与ctx.params.id相对应的商品信息删除
    try {
      // 删除数据库中商品信息成功后，获取到返回结果
      // 需要的参数：商品id
      const res = await removeGoods(ctx.params.id);
      // 如果删除成功，从goods.service那边返回的res=true，否则res=false
      // 将结果返回出去
      // console.log(res);
      if (res) {
        ctx.body = {
          code: 0,
          message: '商品信息删除成功！',
          // result: res,
          // 可以不返回result，因为前端只需要知道状态
          result: '',
        };
      }
      // 防止前端传入的删除商品id不存在数据库中，导致删除res=false
      else {
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch (error) {
      console.log(error);
      return ctx.app.emit('error', deleteGoodsError, ctx);
    }
  }
  async softRemove(ctx, next) {
    // 操作数据库
    // 调用service的softRemoveGoods方法，将request.body中通过参数检验的合法商品参数写入数据库
    try {
      // 删除数据库中商品信息成功后，获取到返回结果
      // 需要的参数：商品id
      const res = await softRemoveGoods(ctx.params.id);
      if (res) {
        ctx.body = {
          code: 0,
          message: '商品下架成功！',
          // result: res,
          // 可以不返回result，因为前端只需要知道状态
          result: '',
        };
      } // 防止前端传入的删除商品id不存在数据库中，导致删除res=false
      else {
        return ctx.app.emit('error', invalidGoodsId, ctx);
      }
    } catch (error) {
      console.log(error);
      return ctx.app.emit('error', softRemoveGoodsError, ctx);
    }
  }
}
// 导出
// 不直接导出这个类，而是导出这个类实例化出的对象
// 导出给goods.route.js使用
module.exports = new GoodsController();
