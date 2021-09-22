// 常见的错误类型及其返回出去的log内容
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
};
