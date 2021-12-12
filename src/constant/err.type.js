// 常见的错误类型及其返回出去的log内容
// 100开头：用户的登录注册模块
// 101开头：token验证模块
module.exports = {
  userFormatError: {
    code: '10001',
    message: '用户名或密码为空',
    result: '',
  },
  userAlreadyExisted: {
    code: '10002',
    message: '用户已经存在',
    result: '',
  },
  // 用户注册错误，用于controller中的容错
  userRegisterError: {
    code: '10003',
    message: '用户注册错误',
    result: '',
  },
  // 用户不存在错误，用于verifyLogin中间件查询不到用户信息
  userDoesNotExist: {
    code: '10004',
    message: '用户不存在数据库中',
    result: '',
  },
  // 用户登录失败，用于verifyLogin中间件catch(error)
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: '',
  },
  // 用户密码不匹配，用于verifyLogin中间件的解密
  invalidPasword: {
    code: '10006',
    message: '密码不匹配',
    result: '',
  },
  // ---------------token错误部分----------------//
  // token过期，用于token解析
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    result: '',
  },
  invalidToken: {
    code: '10102',
    message: 'token无效',
    result: '',
  },
  tokenAnalyzeError: {
    code: '10103',
    message: 'token解析错误',
    result: '',
  },
  // ----------------用户权限错误部分-------------//
  hasNotAdminPermisson: {
    code: '10201',
    message: '用户无管理员权限',
    result: '',
  },
  // ----------------文件上传错误部分-------------//
  fileUploadError: {
    code: '10301',
    message: '文件上传过程出错',
    result: '',
  },
  unSupportedFileType: {
    code: '10302',
    message: '文件格式不支持',
    result: '',
  },
  // ----------------商品参数检验部分-------------//
  goodsFormatError: {
    code: '10401',
    message: '商品参数错误',
    result: '',
  },
  // ---------------商品发布错误-------------//
  publishGoodsError: {
    code: '10402',
    message: '商品发布错误',
    result: '',
  },
  // ---------------商品更新错误-------------//
  updateGoodsError: {
    code: '10403',
    message: '商品更新错误',
    result: '',
  },
  // ---------------商品信息不存在-------------//
  invalidGoodsId: {
    code: '10404',
    message: '商品信息不存在',
    result: '',
  },
};
