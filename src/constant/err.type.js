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
};
