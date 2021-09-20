// 用于操作数据库的层级，从路由层单独抽离出来，解耦
// 导入数据表模型Model：User
const User = require('../model/user.model');

class UserService {
  // 创建用户方法
  async createUser(user_name, password) {
    // 对象模型插入数据
    const res = await User.create({ user_name, password });
    // console.log('service层操作数据库的结果:\n', res);
    // 将结果返回给controller层
    // res是较为详细的信息，其实要用到的是res.dataValues
    return res.dataValues;
  }
  // 查询/获取用户信息
  // 因为可以通过多个参数作为条件去查找，所以将参数定义作对象，并列举出所有可以查找的条件，当其中任意一个参数被传进来，就可以使用条件拼接的方式，准确获取目标用户信息
  async getUserInfo({ id, user_name, password, is_admin }) {
    // 使用短路运算，拼接查询条件
    // 数据库查询条件where是一个对象类型
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    user_name && Object.assign(whereOpt, { user_name });
    password && Object.assign(whereOpt, { password });
    is_admin && Object.assign(whereOpt, { is_admin });

    // findOne异步查询
    // 参数：attributes:{}-需要查询的字段；where:{}-条件
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt,
    });
    return res ? res.dataValues : null;
  }
}

// 导出数据库操作，主要是路由层使用，所以要在路由controller中导入
module.exports = new UserService();
